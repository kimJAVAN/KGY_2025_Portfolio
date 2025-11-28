// store/authStore.ts
import { create } from 'zustand';
import { User } from 'firebase/auth'; // Firebase User 타입 임포트
import { auth } from '@/lib/firebase/firebase'; // Firebase auth 객체 임포트

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean; // 초기화 완료 여부
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setInitialized: (initialized) => set({ initialized }),
}));

// Firebase Auth 상태 변화 리스너 설정
auth.onAuthStateChanged((user) => {
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
  useAuthStore.getState().setInitialized(true);
});
