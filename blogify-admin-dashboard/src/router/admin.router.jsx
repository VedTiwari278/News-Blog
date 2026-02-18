import BlogLayout from "../features/blog/BlogLayout";
import AllBlogs from "../features/blog/AllBlogs";
import Create_Blog from "../features/blog/Create_Blog";
import OverViewLayout from "../features/blog/OverViewLayout";

export const dashboardRoutes = [
  {
    index: true,
    element: <>Dashboard Home</>,
  },
  {
    path: "blogs",
    element: <BlogLayout />,
    children: [
      {
        path: "",
        element: <AllBlogs />,
      },
      {
        path: "create-blog",
        element: <Create_Blog />,
      },
      {
        path: ":slug",
        element: <OverViewLayout/>,
      },
    ],
  },
  {
    path: "users",
    element: <>User Abc</>,
  },
  {
    path: "settings",
    element: <>Setting Abc</>,
  },
];
