import { type FC } from 'react';
import { type Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

const BlogPost: FC<PageProps> = ({ params }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Blog Post: {params.slug}</h1>
      <p>This is where the blog content will be displayed.</p>
      <p>This is where the blog content will be displayed.</p>
      <p>This is where the blog content will be displayed.</p>
      <p>This is where the blog content will be displayed.</p>
      <p>This is where the blog content will be displayed.</p>
    </div>
  );
};

export default BlogPost;