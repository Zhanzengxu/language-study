import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  duration: number;
  image_url?: string;
}

interface Progress {
  id: string;
  course_id: string;
  completed_lessons: number;
  total_lessons: number;
  study_time: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked_at: string;
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  language?: string;
  created_at: string;
  username?: string;
}

interface AppState {
  user: User | null;
  courses: Course[];
  progress: Progress[];
  achievements: Achievement[];
  posts: Post[];
  isAuthenticated: boolean;
  currentLanguage: string;
  setUser: (user: User | null) => void;
  setCurrentLanguage: (lang: string) => void;
  loadCourses: () => Promise<void>;
  loadUserProgress: () => Promise<void>;
  loadAchievements: () => Promise<void>;
  loadPosts: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  courses: [],
  progress: [],
  achievements: [],
  posts: [],
  isAuthenticated: false,
  currentLanguage: 'english',

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setCurrentLanguage: (lang) => set({ currentLanguage: lang }),

  loadCourses: async () => {
    try {
      const { data } = await supabase.from('courses').select('*');
      if (data) set({ courses: data });
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  },

  loadUserProgress: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('progress').select('*').eq('user_id', user.id);
        if (data) set({ progress: data });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  },

  loadAchievements: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('achievements').select('*').eq('user_id', user.id);
        if (data) set({ achievements: data });
      }
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  },

  loadPosts: async () => {
    try {
      const { data } = await supabase
        .from('posts')
        .select(`
          *,
          users (username, avatar_url)
        `)
        .order('created_at', { ascending: false });
      
      if (data) {
        const formatted = data.map((post: any) => ({
          ...post,
          username: post.users?.username,
        }));
        set({ posts: formatted });
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      set({
        user: userData || { id: data.user.id, email: data.user.email! },
        isAuthenticated: true,
      });
    }
  },

  register: async (email, password, username) => {
    console.log('Registering user:', email, username);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Supabase register error:', error);
      throw error;
    }
    console.log('Supabase register data:', data);
    if (data.user) {
      try {
        console.log('Inserting user record...');
        await supabase.from('users').insert({
          id: data.user.id,
          email,
          username,
        });
        console.log('User record inserted');
      } catch (dbError: any) {
        console.error('Database insert error:', dbError);
        // 即使数据库插入失败，也认为注册成功，因为认证已经完成
      }
      set({
        user: { id: data.user.id, email, username },
        isAuthenticated: true,
      });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false, progress: [], achievements: [] });
  },
}));
