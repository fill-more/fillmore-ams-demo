export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string | null;
          icon_url: string | null;
          id: number;
          name: string;
          required_count: number | null;
        };
        Insert: {
          description?: string | null;
          icon_url?: string | null;
          id?: number;
          name: string;
          required_count?: number | null;
        };
        Update: {
          description?: string | null;
          icon_url?: string | null;
          id?: number;
          name?: string;
          required_count?: number | null;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          content: string;
          created_at: string | null;
          id: string;
          task_id: string | null;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          id?: string;
          task_id?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          id?: string;
          task_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'articles_task_id_fkey';
            columns: ['task_id'];
            isOneToOne: false;
            referencedRelation: 'tasks';
            referencedColumns: ['id'];
          },
        ];
      };
      buddies: {
        Row: {
          buddy_id: string;
          created_at: string | null;
          user_id: string;
        };
        Insert: {
          buddy_id: string;
          created_at?: string | null;
          user_id: string;
        };
        Update: {
          buddy_id?: string;
          created_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'buddies_buddy_id_fkey';
            columns: ['buddy_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'buddies_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      chatroom_participants: {
        Row: {
          chatroom_id: string;
          joined_at: string;
          user_id: string;
        };
        Insert: {
          chatroom_id: string;
          joined_at?: string;
          user_id: string;
        };
        Update: {
          chatroom_id?: string;
          joined_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chatroom_participants_chatroom_id_fkey';
            columns: ['chatroom_id'];
            isOneToOne: false;
            referencedRelation: 'chatrooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chatroom_participants_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      chatrooms: {
        Row: {
          created_at: string;
          id: string;
          is_announcement: boolean;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_announcement?: boolean;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_announcement?: boolean;
        };
        Relationships: [];
      };
      instructions: {
        Row: {
          content: string;
          created_at: string | null;
          id: string;
          is_active: boolean | null;
          title: string;
          type: string;
          updated_at: string | null;
          version: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          title: string;
          type: string;
          updated_at?: string | null;
          version: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          title?: string;
          type?: string;
          updated_at?: string | null;
          version?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          chatroom_id: string;
          content: string;
          created_at: string;
          id: string;
          is_read: boolean;
          sender_id: string | null;
          type: string;
        };
        Insert: {
          chatroom_id: string;
          content: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          sender_id?: string | null;
          type: string;
        };
        Update: {
          chatroom_id?: string;
          content?: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          sender_id?: string | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_chatroom_id_fkey';
            columns: ['chatroom_id'];
            isOneToOne: false;
            referencedRelation: 'chatrooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_sender_id_fkey';
            columns: ['sender_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          background: string | null;
          branch: string | null;
          created_at: string;
          experience_points: number;
          first_name: string;
          id: string;
          last_name: string;
          level: number;
          profile_image_url: string | null;
          rank: string | null;
          role: Database['public']['Enums']['ROLE'] | null;
          updated_at: string;
        };
        Insert: {
          background?: string | null;
          branch?: string | null;
          created_at?: string;
          experience_points?: number;
          first_name: string;
          id?: string;
          last_name: string;
          level?: number;
          profile_image_url?: string | null;
          rank?: string | null;
          role?: Database['public']['Enums']['ROLE'] | null;
          updated_at?: string;
        };
        Update: {
          background?: string | null;
          branch?: string | null;
          created_at?: string;
          experience_points?: number;
          first_name?: string;
          id?: string;
          last_name?: string;
          level?: number;
          profile_image_url?: string | null;
          rank?: string | null;
          role?: Database['public']['Enums']['ROLE'] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      question_choices: {
        Row: {
          choice_text: string | null;
          created_at: string | null;
          id: string;
          is_correct: boolean | null;
          question_id: string | null;
        };
        Insert: {
          choice_text?: string | null;
          created_at?: string | null;
          id?: string;
          is_correct?: boolean | null;
          question_id?: string | null;
        };
        Update: {
          choice_text?: string | null;
          created_at?: string | null;
          id?: string;
          is_correct?: boolean | null;
          question_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'question_choices_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
        ];
      };
      questions: {
        Row: {
          created_at: string | null;
          id: string;
          order_index: number | null;
          page_reference: number | null;
          question_text: string;
          rationale: string | null;
          task_id: string | null;
          type: Database['public']['Enums']['question_type'];
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          order_index?: number | null;
          page_reference?: number | null;
          question_text: string;
          rationale?: string | null;
          task_id?: string | null;
          type: Database['public']['Enums']['question_type'];
        };
        Update: {
          created_at?: string | null;
          id?: string;
          order_index?: number | null;
          page_reference?: number | null;
          question_text?: string;
          rationale?: string | null;
          task_id?: string | null;
          type?: Database['public']['Enums']['question_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'questions_task_id_fkey';
            columns: ['task_id'];
            isOneToOne: false;
            referencedRelation: 'tasks';
            referencedColumns: ['id'];
          },
        ];
      };
      stages: {
        Row: {
          created_at: string | null;
          id: string;
          label: string;
          order_index: number;
          stage_code: string;
          task_type: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          label: string;
          order_index: number;
          stage_code: string;
          task_type: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          label?: string;
          order_index?: number;
          stage_code?: string;
          task_type?: string;
        };
        Relationships: [];
      };
      system_messages: {
        Row: {
          message_id: string;
          task_id: string | null;
        };
        Insert: {
          message_id: string;
          task_id?: string | null;
        };
        Update: {
          message_id?: string;
          task_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'system_messages_message_id_fkey';
            columns: ['message_id'];
            isOneToOne: true;
            referencedRelation: 'messages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'system_messages_task_id_fkey';
            columns: ['task_id'];
            isOneToOne: false;
            referencedRelation: 'tasks';
            referencedColumns: ['id'];
          },
        ];
      };
      tasks: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          label: string;
          order_index: number;
          percent_left: number | null;
          percent_top: number | null;
          stage_id: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          label: string;
          order_index: number;
          percent_left?: number | null;
          percent_top?: number | null;
          stage_id: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          label?: string;
          order_index?: number;
          percent_left?: number | null;
          percent_top?: number | null;
          stage_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_stage_id_fkey';
            columns: ['stage_id'];
            isOneToOne: false;
            referencedRelation: 'stages';
            referencedColumns: ['id'];
          },
        ];
      };
      user_achievements: {
        Row: {
          achieved_at: string | null;
          achievement_id: number;
          is_achieved: boolean;
          progress: number;
          user_id: string;
        };
        Insert: {
          achieved_at?: string | null;
          achievement_id: number;
          is_achieved?: boolean;
          progress?: number;
          user_id: string;
        };
        Update: {
          achieved_at?: string | null;
          achievement_id?: number;
          is_achieved?: boolean;
          progress?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_achievements_achievement_id_fkey';
            columns: ['achievement_id'];
            isOneToOne: false;
            referencedRelation: 'achievements';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_achievements_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      question_type: 'Multiple Choice' | 'True or False' | 'Fill in Blank';
      ROLE: 'educator' | 'learner';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      question_type: ['Multiple Choice', 'True or False', 'Fill in Blank'],
      ROLE: ['educator', 'learner'],
    },
  },
} as const;
