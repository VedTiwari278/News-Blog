import SingleBlog from "@/components/blog/SingleBlog";

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <div>
      <SingleBlog slug={slug} />
    </div>
  );
}
