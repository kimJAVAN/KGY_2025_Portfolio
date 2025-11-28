// store/blogStore.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import type { Post, CreatePostInput, UpdatePostInput } from '@/types/blog';

interface BlogState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchPosts: () => Promise<void>;
  fetchPostBySlug: (slug: string) => Promise<void>;
  createPost: (data: CreatePostInput) => Promise<void>;
  updatePost: (data: UpdatePostInput) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  setCurrentPost: (post: Post | null) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ posts: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPostBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      set({ currentPost: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createPost: async (postData: CreatePostInput) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...postData, author_id: user?.id }])
        .select()
        .single();
      
      if (error) throw error;
      set((state) => ({ 
        posts: [data, ...state.posts], 
        loading: false 
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updatePost: async ({ id, ...updates }: UpdatePostInput) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      set((state) => ({ 
        posts: state.posts.map(p => p.id === id ? data : p),
        currentPost: state.currentPost?.id === id ? data : state.currentPost,
        loading: false 
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deletePost: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({ 
        posts: state.posts.filter(p => p.id !== id),
        loading: false 
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setCurrentPost: (post) => set({ currentPost: post }),
}));