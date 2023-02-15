export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tb_comment: {
        Row: {
          cid: number;
          content: string | null;
          createdAt: string | null;
          pid: number | null;
          uid: string | null;
        };
        Insert: {
          cid: number;
          content?: string | null;
          createdAt?: string | null;
          pid?: number | null;
          uid?: string | null;
        };
        Update: {
          cid?: number;
          content?: string | null;
          createdAt?: string | null;
          pid?: number | null;
          uid?: string | null;
        };
      };
      tb_post: {
        Row: {
          content: string | null;
          createdAt: string | null;
          dislike: string | null;
          excerpt: string | null;
          like: string | null;
          pid: number;
          title: string | null;
          uid: string | null;
        };
        Insert: {
          content?: string | null;
          createdAt?: string | null;
          dislike?: string | null;
          excerpt?: string | null;
          like?: string | null;
          pid: number;
          title?: string | null;
          uid?: string | null;
        };
        Update: {
          content?: string | null;
          createdAt?: string | null;
          dislike?: string | null;
          excerpt?: string | null;
          like?: string | null;
          pid?: number;
          title?: string | null;
          uid?: string | null;
        };
      };
      tb_user: {
        Row: {
          email: string | null;
          image: string | null;
          nickname: string | null;
          password: string | null;
          provider: string;
          uid: string;
        };
        Insert: {
          email?: string | null;
          image?: string | null;
          nickname?: string | null;
          password?: string | null;
          provider?: string;
          uid: string;
        };
        Update: {
          email?: string | null;
          image?: string | null;
          nickname?: string | null;
          password?: string | null;
          provider?: string;
          uid?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
