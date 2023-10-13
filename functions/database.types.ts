export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      game_stream: {
        Row: {
          created_at: string
          id: number
          name: string
          stream_link: string
          view_price: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          stream_link: string
          view_price: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          stream_link?: string
          view_price?: number
        }
        Relationships: []
      }
      mlb_game_today: {
        Row: {
          away_team: number
          created_at: string
          game_stream: number | null
          home_team: number
          id: number
          start_time: string
          title: string
        }
        Insert: {
          away_team: number
          created_at?: string
          game_stream?: number | null
          home_team: number
          id?: number
          start_time: string
          title: string
        }
        Update: {
          away_team?: number
          created_at?: string
          game_stream?: number | null
          home_team?: number
          id?: number
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "mlb_game_today_away_team_fkey"
            columns: ["away_team"]
            referencedRelation: "mlb_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlb_game_today_game_stream_fkey"
            columns: ["game_stream"]
            referencedRelation: "game_stream"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlb_game_today_home_team_fkey"
            columns: ["home_team"]
            referencedRelation: "mlb_team"
            referencedColumns: ["id"]
          }
        ]
      }
      mlb_team: {
        Row: {
          abbreviation: string
          created_at: string
          display_name: string
          division: Database["public"]["Enums"]["mlb_division"]
          id: number
          league: Database["public"]["Enums"]["mlb_league"]
          logo: string
          short_display_name: string
        }
        Insert: {
          abbreviation: string
          created_at?: string
          display_name: string
          division: Database["public"]["Enums"]["mlb_division"]
          id?: number
          league: Database["public"]["Enums"]["mlb_league"]
          logo: string
          short_display_name: string
        }
        Update: {
          abbreviation?: string
          created_at?: string
          display_name?: string
          division?: Database["public"]["Enums"]["mlb_division"]
          id?: number
          league?: Database["public"]["Enums"]["mlb_league"]
          logo?: string
          short_display_name?: string
        }
        Relationships: []
      }
      nhl_team: {
        Row: {
          abbreviation: string
          created_at: string
          display_name: string
          id: number
          logo: string
          short_display_name: string
        }
        Insert: {
          abbreviation: string
          created_at?: string
          display_name: string
          id?: number
          logo: string
          short_display_name: string
        }
        Update: {
          abbreviation?: string
          created_at?: string
          display_name?: string
          id?: number
          logo?: string
          short_display_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      mlb_division: "Central" | "East" | "West"
      mlb_league: "American League" | "National League"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

