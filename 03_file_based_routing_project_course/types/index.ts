export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          date: string | null;
          description: string | null;
          id: string;
          image: string | null;
          isFeatured: boolean | null;
          location: string | null;
          title: string;
        };
        Insert: {
          date?: string | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          isFeatured?: boolean | null;
          location?: string | null;
          title: string;
        };
        Update: {
          date?: string | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          isFeatured?: boolean | null;
          location?: string | null;
          title?: string;
        };
        Relationships: [];
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

export type Event = Database["public"]["Tables"]["events"]["Row"];
