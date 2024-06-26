import { client } from "lib/sanity.client"
import urlFor from "lib/urlFor"
import { groq } from "next-sanity"
import Image from "next/image"
import { notFound } from 'next/navigation';
import { PortableText } from "@portabletext/react"
import RichTextComponents from "@/components/RichTextComponents"
import PostCommentSection from "@/components/PostCommentSection";
type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 60

export async function generateStaticParams() {
    const query = groq`
    *[_type == "post"]{

        slug,
    }
    `
    const slugs : Post[] = await client.fetch(query)
    const slugRoutes = slugs.map((slug) => slug.slug.current)

    return slugRoutes.map(slug => ({
        slug
    }))
}

const Post = async ({ params: { slug } }: Props) => {
    const query = groq`
        *[_type == "post" && slug.current == $slug][0]{
            ...,
            author->,
            categories[]->,
        }
    `
    const post: Post = await client.fetch(query, { slug })
    if(!post) {
        return notFound()
    }
    return (
        <article className="px-10 pb-28 mt-20">
            <section className="space-y-2 border-[#E7E247] text-white">
                <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
                    <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
                        <Image
                            className="object-cover object-center mx-auto"
                            src={urlFor(post.mainImage).url()}
                            alt={post.author.name}
                            fill
                        />
                    </div>

                    <section className="p-5 bg-[#E7E247] w-full text-black">
                        <div className="flex flex-col md:flex-row justify-between gap-y-5">
                            <div>
                                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                                <p>
                                    {
                                        new Date(post._createdAt).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                    }
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Image
                                    className="rounded-full"
                                    src={urlFor(post.author.image).url()}
                                    alt={post.author.name}
                                    height={40}
                                    width={40}
                                />
                                <div className="w-64">
                                    <h3 className="text-lg font-bold">{post.author.name}</h3>
                                    <div>{/**TODO: Author Bio */}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="pt-10 italic">{post.description}</h2>
                            <div className="flex items-center justify-end mt-auto space-x-2">
                                {post.categories.map((category) => (
                                    <p key={category._id} className="bg-gray-800 w-min text-center text-white rounded-full px-3 py-1 font-semibold">
                                        {category.title}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <PortableText value={post.body} components={RichTextComponents} />

            <PostCommentSection slug={post.slug.current}/>
        </article>
    )
}
export default Post