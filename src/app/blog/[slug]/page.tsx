interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: PageProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Blog Post: {params.slug}</h1>
      <p>This is where the blog content will be displayed.</p>
    </div>
  );
}
