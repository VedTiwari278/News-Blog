import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../../components/Input";
import { BASE_URL } from "../../config/index.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`https://vedtest-8pdo4e5q1-sachinkushwhas-projects.vercel.app/api/v1/auth/register`, data, {
        withCredentials: true,
      });
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className=" flex flex-col md:flex-row">
      {/* Left Side Design */}

      {/* Right Side Form */}
      <div className=" flex items-center justify-center">
        <div className="w-full ">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-white">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Horizontal Name & Email */}
            <div className="flex flex-col md:flex-row gap-6">
              <Input
                label="Name"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                error={errors.name?.message}
                className=" text-white placeholder-gray-400 border-b border-white rounded-none px-0 py-2 w-full focus:outline-none focus:border-white"
              />

              <Input
                label="Email"
                placeholder="Email Address"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={errors.email?.message}
                className=" text-white placeholder-gray-400 border-b border-white rounded-none px-0 py-2 w-full focus:outline-none focus:border-white"
              />
            </div>

            {/* Horizontal Password & Confirm Password */}
            <div className="flex flex-col md:flex-row gap-6">
              <Input
                label="Password"
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                error={errors.password?.message}
                className="bg-black text-white placeholder-gray-400 border-b border-white rounded-none px-0 py-2 w-full focus:outline-none focus:border-white"
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={errors.confirmPassword?.message}
                className="bg-black text-white placeholder-gray-400 border-b border-white rounded-none px-0 py-2 w-full focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className=" w-fit px-6 rounded py-1 bg-white text-black font-bold  shadow-lg hover:bg-gray-200 transition transform hover:scale-105"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-white">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
