// store/blogStore.ts
import { create } from 'zustand';
import { db } from '@/lib/firebase/firebase'; // Firestore db 객체 임포트
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, Timestamp } from 'firebase/firestore'; // Timestamp 임포트
import { useAuthStore } from './authStore'; // useAuthStore 임포트

export interface Post {
  id?: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  published: boolean;
  authorId: string;
  authorEmail: string;
  createdAt: Timestamp; // any 대신 Timestamp 사용
  updatedAt?: Timestamp; // any 대신 Timestamp 사용
}

interface BlogState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (postData: Omit<Post, 'id' | 'authorId' | 'authorEmail' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  // updatePost: (id: string, postData: Partial<Post>) => Promise<void>;
  // deletePost: (id: string) => Promise<void>;
}

export const useBlogStore = create<BlogState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const postsCollection = collection(db, 'posts');
      const q = query(postsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() } as Post);
      });
      set({ posts: fetchedPosts, loading: false });
    } catch (error: unknown) { // 'any' 대신 'unknown' 사용
      if (error instanceof Error) {
        console.error("Failed to fetch posts:", error.message);
        set({ error: error.message, loading: false });
      } else {
        console.error("Failed to fetch posts: 알 수 없는 오류");
        set({ error: "알 수 없는 오류가 발생했습니다.", loading: false });
      }
    }
  },

  createPost: async (postData) => {
    set({ loading: true, error: null });
    const { user } = useAuthStore.getState();

    if (!user) {
      set({ error: "글을 작성하려면 로그인해야 합니다.", loading: false });
      throw new Error("User not authenticated.");
    }

    try {
      const newPost: Omit<Post, 'id'> = {
        ...postData,
        authorId: user.uid,
        authorEmail: user.email || 'anonymous',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      set((state) => ({
        posts: [{ id: docRef.id, ...newPost } as Post, ...state.posts],
        loading: false,
      }));
    } catch (error: unknown) { // 'any' 대신 'unknown' 사용
      if (error instanceof Error) {
        console.error("Failed to create post:", error.message);
        set({ error: error.message, loading: false });
      } else {
        console.error("Failed to create post: 알 수 없는 오류");
        set({ error: "알 수 없는 오류가 발생했습니다.", loading: false });
      }
      throw error;
    }
  },

  // TODO: updatePost 및 deletePost 구현 예정
}));
