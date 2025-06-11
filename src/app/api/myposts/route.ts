import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();

  const authHeader = req.headers.get('authorization');
  console.log("Authorization Header:", authHeader);

  const token = authHeader?.replace('Bearer ', '');
  console.log("Extracted Token:", token);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
  }

  const userId = verifyToken(token);
  console.log("Verified User ID:", userId);

  if (!userId) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  try {
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}