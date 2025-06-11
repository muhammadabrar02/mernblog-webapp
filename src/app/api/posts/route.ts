import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  await dbConnect();
  
  // Add token verification
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  const body = await req.json();
  const { title, slug, content } = body; // Remove userId from body since we get it from token

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'Missing required fields: title, slug, or content' }, { status: 400 });
  }

  try {
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

    const post = await Post.create({ title, slug, content, userId }); // Use userId from token
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Failed to create post';
    return NextResponse.json(
      { error: 'Failed to create post', details: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Failed to fetch posts';
    return NextResponse.json({ error: 'Failed to fetch posts', details: message }, { status: 500 });
  }
}