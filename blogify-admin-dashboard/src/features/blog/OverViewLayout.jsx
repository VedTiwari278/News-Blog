import BlogOverview from "./BlogOverview";
import RecentBlog from "./RecentBlog";

function BlogLayout() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 p-2 gap-8">
        <div className="md:col-span-2">
          <BlogOverview />
        </div>

        <div className="md:col-span-1">
          <RecentBlog />
        </div>
      </div>
    </div>
  );
}

export default BlogLayout;
