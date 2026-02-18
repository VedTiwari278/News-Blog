import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const featuredBlogs = [
    {
      id: 1,
      title: "Blog Title 1",
      subtitle: "Insights and tips to boost your knowledge.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Blog Title 2",
      subtitle: "Learn the latest trends and strategies.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Blog Title 3",
      subtitle: "Practical guides to improve your skills every day.",
      image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Blog Title 4",
      subtitle: "Deep insights on trending topics and strategies.",
      image:
        "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  // Carousel state
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent(current === featuredBlogs.length - 1 ? 0 : current + 1);
  const prevSlide = () =>
    setCurrent(current === 0 ? featuredBlogs.length - 1 : current - 1);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-black text-center p-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Welcome to Blogify
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover, create, and share amazing blogs with the world.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-900 font-semibold text-white shadow  transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-gray-900 font-semibold text-white shadow  transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Featured Blogs Carousel */}
      <section className="py-4 px-4 h-[70vh] md:h-[80vh] md:px-20">
        <h2 className="text-3xl text-black font-semibold mb-6 text-center font-[cursive]">
          Highlights
        </h2>
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {featuredBlogs.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full h-64 md:h-96 relative flex items-center justify-center"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="relative z-10 text-center md:p-6 mx-4 bg-black bg-opacity-50 backdrop-blur-sm p-2 rounded">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white font-[cursive]">
                    {slide.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© 2026 Blogify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
