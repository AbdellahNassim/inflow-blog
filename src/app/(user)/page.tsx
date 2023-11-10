import Image from "next/image";
import { Inter, Rubik } from "@next/font/google";
import styles from "./page.module.css";
import { previewData } from "next/headers";
import { client } from "../../../lib/sanity.client";
import { groq } from "next-sanity";
import PreviewSuspense from "../../components/PreviewSuspense";
import PreviewBlogList from "@/components/PreviewBlogList";
import BlogList from "@/components/BlogList";

const query = groq`
*[_type == "post"] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;

//const rubik = Rubik({ subsets: ['latin'] })

export const revalidate = 60;

export default async function Home() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div className="animate-pulse text-center text-lg text-[#E7E247]">
            Loading Preview
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }
  const posts = await client.fetch(query);
  return (
    <main className="min-h-screen">
      <BlogList posts={posts} />
    </main>
  );
}
