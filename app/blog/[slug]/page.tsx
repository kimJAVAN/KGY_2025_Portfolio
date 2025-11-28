// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import PostDetail from '@/components/blog/PostDetail';
import PostActionButtons from '@/components/blog/PostActionButtons';
import type { Post } from '@/types/blog';

// Revalidate the page every hour
export const revalidate = 3600;

// This function can be used to statically generate routes at build time
export async function generateStaticParams() {
  const { data: posts } = await supabaseServer.from('posts').select('slug');
  return posts?.map(({ slug }) => ({ slug })) || [];
}

async function getPost(slug: string): Promise<Post | null> {
  const { data: post, error } = await supabaseServer
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    return null;
  }
  return post;
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <PostDetail post={post} />
      <PostActionButtons post={post} />
    </div>
  );
}