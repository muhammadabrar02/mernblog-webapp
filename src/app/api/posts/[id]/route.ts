// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../../../lib/dbConnect';
// import Post from '../../../../../models/Post';

// // Updated interface to match Next.js's expected shape
// interface RouteContext {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export async function DELETE(
//   req: NextRequest,
//   context: RouteContext
// ) {
//   await dbConnect();

//   try {
//     // Await the params promise first
//     const params = await context.params;
//     const deletedPost = await Post.findOneAndDelete({ slug: params.id });

//     if (!deletedPost) {
//       return NextResponse.json(
//         { success: false, message: 'Post not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: 'Post deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete post' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   context: RouteContext
// ) {
//   await dbConnect();

//   try {
//     // Await both the params and request.json()
//     const [params, { title, content }] = await Promise.all([
//       context.params,
//       request.json()
//     ]);

//     if (!title?.trim() || !content?.trim()) {
//       return NextResponse.json(
//         { success: false, error: 'Missing or empty title/content' },
//         { status: 400 }
//       );
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       params.id,
//       { title, content },
//       { new: true, runValidators: true }
//     );

//     if (!updatedPost) {
//       return NextResponse.json(
//         { success: false, error: 'Post not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: updatedPost },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating post:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }