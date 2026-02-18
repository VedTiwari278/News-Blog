// Login.jsx
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      if (err?.status === 404) {
        toast.error("User does not exist");
      }
      if (err?.status === 401) {
        toast.error("Invalid Credentials!");
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl bg-black rounded-3xl shadow-2xl p-12">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          placeholder="Your Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
          className="bg-black text-white placeholder-gray-400 border-b border-white rounded-none px-0 py-2 w-full focus:outline-none focus:border-white"
        />
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
          className="bg-black text-white placeholder-gray-400 border-b border-white rounded-none px-0 py-2 w-full focus:outline-none focus:border-white"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className=" w-fit px-6 rounded py-1 bg-white text-black font-bold  shadow-lg hover:bg-gray-200 transition transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-white">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
