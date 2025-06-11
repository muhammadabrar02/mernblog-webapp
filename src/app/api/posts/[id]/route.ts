import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Post from '../../../../../models/Post';

// Correct context type for App Router route handlers
interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  await dbConnect();

  try {
    const deletedPost = await Post.findOneAndDelete({ slug: context.params.id });

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: Context
) {
  await dbConnect();

  try {
    const { title, content } = await request.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing or empty title/content' },
        { status: 400 }
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      context.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
