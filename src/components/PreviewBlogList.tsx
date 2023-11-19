"use client";
import { usePreview } from "lib/sanity.preview";
import BlogList from "./BlogList";
type Props = {
  query: string;
};

function PreviewBlogList({ query }: Props) {
  const posts = usePreview(null, query);
  //console.log("LOADING POSTS", posts)
  return <BlogList posts={posts} searchParams={{}} />;
}

export default PreviewBlogList;
