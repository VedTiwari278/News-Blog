import { Outlet } from "react-router-dom";

function BlogLayout() {
  return (
    <div className="min-h-screen overflow-x-auto ">
      <Outlet></Outlet>
    </div>
  );
}

export default BlogLayout;
