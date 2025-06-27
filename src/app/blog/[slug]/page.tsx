import type { FC } from "react"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const BlogPost: FC<PageProps> = async ({ params }) => {
  // Await the params since it's now a Promise in Next.js 15
  const { slug } = await params

  return (
    <div>
      <h1 className="text-3xl font-bold text-black">Exploring the Depths of {slug}</h1>
      <p className="mt-4 text-lg text-gray-700">
        In this article, we delve into the fascinating world of {slug}, covering key insights,
        practical examples, and tips to get the most out of it. Whether you're a beginner or
        an expert, there's something here for everyone.
      </p>
      
    </div>
  )
}

export default BlogPost
