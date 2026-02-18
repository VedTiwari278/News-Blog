import React, { useRef, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import Button from "../../components/Button";
import { BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";

function Create_Blog() {
  const editor = useRef(null);

  const { token } = useAuth();
  const { register, handleSubmit, control } = useForm();

  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const [mainPreview, setMainPreview] = useState(null);
  const [featuredPreview, setFeaturedPreview] = useState(null);

  const config = {
    height: 400,
    placeholder: "Write your blog content...",
    uploader: { insertImageAsBase64URI: true },
  };

  // TAG ENTER
  const handleTagKey = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // KEYWORD ENTER
  const handleKeywordKey = (e) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeTag = (i) => {
    setTags(tags.filter((_, idx) => idx !== i));
  };

  const removeKeyword = (i) => {
    setKeywords(keywords.filter((_, idx) => idx !== i));
  };

  // SUBMIT
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("summary", data.summary);
    formData.append("content", data.content);

    tags.forEach((t) => formData.append("tags[]", t));
    keywords.forEach((k) => formData.append("keywords[]", k));

    if (data.mainImage?.[0]) {
      formData.append("mainImage", data.mainImage[0]);
    }

    if (data.featuredImage?.[0]) {
      formData.append("featuredImage", data.featuredImage[0]);
    }

    console.log("DATA:", data);

    await axios.post(`${BASE_URL}/blog/create`, formData, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });

    alert("Blog Created ✅");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* TITLE */}
        <div>
          <label className="font-medium">Title</label>
          <input
            {...register("title")}
            placeholder="Blog Title"
            className="w-full border p-3 rounded"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-medium">Category</label>
          <input
            {...register("category")}
            placeholder="Category"
            className="w-full border p-3 rounded"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="font-medium">Tags</label>
          <input
            placeholder="Type tag and press Enter"
            className="w-full border p-3 rounded"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
          />

          <div className="flex gap-2 flex-wrap mt-2">
            {tags.map((t, i) => (
              <span
                key={i}
                onClick={() => removeTag(i)}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded cursor-pointer"
              >
                {t} ✕
              </span>
            ))}
          </div>
        </div>

        {/* KEYWORDS */}
        <div>
          <label className="font-medium">Keywords</label>
          <input
            placeholder="Type keyword and press Enter"
            className="w-full border p-3 rounded"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeywordKey}
          />

          <div className="flex gap-2 flex-wrap mt-2">
            {keywords.map((k, i) => (
              <span
                key={i}
                onClick={() => removeKeyword(i)}
                className="bg-green-100 text-green-700 px-3 py-1 rounded cursor-pointer"
              >
                {k} ✕
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <textarea
        {...register("summary")}
        placeholder="Summary..."
        className="w-full border p-3 mb-4 mt-10 rounded h-24"
      />

      {/* IMAGES */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* MAIN */}
        <div>
          <label className="block font-medium mb-2">Main Image</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
            <span className="text-gray-500">Click to upload</span>
            <input
              type="file"
              className="hidden"
              {...register("mainImage", {
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setMainPreview(URL.createObjectURL(file));
                  }
                },
              })}
            />
          </label>

          {mainPreview && (
            <img
              src={mainPreview}
              className="mt-3 h-32 w-full object-cover rounded"
            />
          )}
        </div>

        {/* FEATURED */}
        <div>
          <label className="block font-medium mb-2">Featured Image</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
            <span className="text-gray-500">Click to upload</span>
            <input
              type="file"
              className="hidden"
              {...register("featuredImage", {
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFeaturedPreview(URL.createObjectURL(file));
                  }
                },
              })}
            />
          </label>

          {featuredPreview && (
            <img
              src={featuredPreview}
              className="mt-3 h-32 w-full object-cover rounded"
            />
          )}
        </div>
      </div>

      {/* JODIT */}
      <Controller
        name="content"
        control={control}
        defaultValue="" // ✅ REQUIRED
        render={({ field }) => (
          <JoditEditor
            ref={editor}
            value={field.value}
            config={config}
            onChange={(newContent) => field.onChange(newContent)} // ✅ FIX
          />
        )}
      />

      <Button type="submit" className="mt-5">
        Publish Blog
      </Button>
    </form>
  );
}

export default Create_Blog;
