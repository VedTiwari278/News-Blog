import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50">
        <DigitalClock />
      </div>

      <div className="md:w-1/2 flex items-center justify-center bg-black p-6 pt-20 md:pt-6">
        <div className="text-center text-white px-6 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Welcome to Blogify
          </h1>

          <p className="text-base md:text-lg mb-6">
            Discover, create, and share amazing blogs with the world.
          </p>

          <div className="flex justify-center gap-4 md:gap-6 mt-4">
            <Link
              to="/login"
              className="px-5 py-2 border border-white rounded-lg hover:bg-white hover:text-black text-sm md:text-base"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 border border-white rounded-lg hover:bg-white hover:text-black text-sm md:text-base"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex items-center justify-center bg-black p-6">
        <Outlet />
      </div>
    </div>
  );
}

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
      text-white 
      text-sm sm:text-base md:text-xl 
      border border-white/40 
      rounded-md 
      px-4 py-1.5 
      bg-red-500 backdrop-blur
      font-mono tracking-widest
      shadow-lg
    "
    >
      {time.toLocaleTimeString("en-IN")}
    </div>
  );
}
