import type { FC } from "react"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const BlogPost: FC<PageProps> = async ({ params }) => {
  const { slug } = await params

  return (
    <div>
      <h1 className="text-3xl font-bold text-black">Exploring the Depths of {slug}</h1>
      <p className="mt-4 text-lg text-gray-700">
        In this article, we delve into the fascinating world of {slug}, covering key insights,
        practical examples, and tips to get the most out of it. Whether you&apos;re a beginner or
        an expert, there&apos;s something here for everyone.
      </p>
    </div>
  )
}

export default BlogPost
