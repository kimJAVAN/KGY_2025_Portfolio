// app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { postSchema } from '@/schemas/blog';
import { ZodError } from 'zod';

// GET all posts
export async function GET() {
  const { data: posts, error } = await supabaseServer
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(posts);
}

// POST a new post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = postSchema.parse(body);

    // TODO: Add author_id based on authenticated user
    const postData = {
      ...validatedData,
      // author_id: '...' 
    };

    const { data, error } = await supabaseServer
      .from('posts')
      .insert(postData)
      .single();

    if (error) {
      // Handle potential database errors, e.g., unique constraint violation for 'slug'
      if (error.code === '23505') { // unique_violation
        return NextResponse.json({ error: 'A post with this slug already exists.' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
