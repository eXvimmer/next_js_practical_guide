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
      comments: {
        Row: {
          created_at: string;
          email: string;
          event_id: string;
          id: number;
          text: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          event_id: string;
          id?: number;
          text: string;
          username: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          event_id?: string;
          id?: number;
          text?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
      };
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
      newsletter: {
        Row: {
          created_at: string;
          email: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
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
export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export interface Notification {
  title: string;
  message: string;
  status: "pending" | "success" | "error";
}
export interface NotificationContextType {
  notification: null | Notification;
  showNotification: (data: Notification) => void;
  hideNotification: () => void;
}
