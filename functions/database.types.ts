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
      cfb_game_today: {
        Row: {
          away_team_id: number
          created_at: string
          home_team_id: number
          id: number
          start_time: string
          stream_link_id: number | null
          title: string
          view_price_dollars: number
        }
        Insert: {
          away_team_id: number
          created_at?: string
          home_team_id: number
          id?: number
          start_time: string
          stream_link_id?: number | null
          title: string
          view_price_dollars: number
        }
        Update: {
          away_team_id?: number
          created_at?: string
          home_team_id?: number
          id?: number
          start_time?: string
          stream_link_id?: number | null
          title?: string
          view_price_dollars?: number
        }
        Relationships: [
          {
            foreignKeyName: "cfb_game_today_away_team_id_fkey"
            columns: ["away_team_id"]
            referencedRelation: "cfb_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cfb_game_today_home_team_id_fkey"
            columns: ["home_team_id"]
            referencedRelation: "cfb_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cfb_game_today_stream_link_id_fkey"
            columns: ["stream_link_id"]
            referencedRelation: "stream_link"
            referencedColumns: ["id"]
          }
        ]
      }
      cfb_team: {
        Row: {
          abbreviation: string
          conference: Database["public"]["Enums"]["cfb_conference"]
          created_at: string
          display_name: string
          id: number
          logo: string
          short_display_name: string
        }
        Insert: {
          abbreviation: string
          conference: Database["public"]["Enums"]["cfb_conference"]
          created_at?: string
          display_name: string
          id?: number
          logo: string
          short_display_name: string
        }
        Update: {
          abbreviation?: string
          conference?: Database["public"]["Enums"]["cfb_conference"]
          created_at?: string
          display_name?: string
          id?: number
          logo?: string
          short_display_name?: string
        }
        Relationships: []
      }
      mlb_game_today: {
        Row: {
          away_team_id: number
          created_at: string
          home_team_id: number
          id: number
          start_time: string
          stream_link_id: number | null
          title: string
          view_price_dollars: number
        }
        Insert: {
          away_team_id: number
          created_at?: string
          home_team_id: number
          id?: number
          start_time: string
          stream_link_id?: number | null
          title: string
          view_price_dollars: number
        }
        Update: {
          away_team_id?: number
          created_at?: string
          home_team_id?: number
          id?: number
          start_time?: string
          stream_link_id?: number | null
          title?: string
          view_price_dollars?: number
        }
        Relationships: [
          {
            foreignKeyName: "mlb_game_today_away_team_id_fkey"
            columns: ["away_team_id"]
            referencedRelation: "mlb_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlb_game_today_home_team_id_fkey"
            columns: ["home_team_id"]
            referencedRelation: "mlb_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mlb_game_today_stream_link_id_fkey"
            columns: ["stream_link_id"]
            referencedRelation: "stream_link"
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
      nfl_game_today: {
        Row: {
          away_team_id: number
          created_at: string
          home_team_id: number
          id: number
          start_time: string
          stream_link_id: number | null
          title: string
          view_price_dollars: number
        }
        Insert: {
          away_team_id: number
          created_at?: string
          home_team_id: number
          id?: number
          start_time: string
          stream_link_id?: number | null
          title: string
          view_price_dollars: number
        }
        Update: {
          away_team_id?: number
          created_at?: string
          home_team_id?: number
          id?: number
          start_time?: string
          stream_link_id?: number | null
          title?: string
          view_price_dollars?: number
        }
        Relationships: [
          {
            foreignKeyName: "nfl_game_today_away_team_id_fkey"
            columns: ["away_team_id"]
            referencedRelation: "nfl_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfl_game_today_home_team_id_fkey"
            columns: ["home_team_id"]
            referencedRelation: "nfl_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfl_game_today_stream_link_id_fkey"
            columns: ["stream_link_id"]
            referencedRelation: "stream_link"
            referencedColumns: ["id"]
          }
        ]
      }
      nfl_team: {
        Row: {
          abbreviation: string
          conference: Database["public"]["Enums"]["nfl_conference"] | null
          created_at: string
          display_name: string
          division: Database["public"]["Enums"]["nfl_division"]
          id: number
          logo: string
          short_display_name: string
        }
        Insert: {
          abbreviation: string
          conference?: Database["public"]["Enums"]["nfl_conference"] | null
          created_at?: string
          display_name: string
          division: Database["public"]["Enums"]["nfl_division"]
          id?: number
          logo: string
          short_display_name: string
        }
        Update: {
          abbreviation?: string
          conference?: Database["public"]["Enums"]["nfl_conference"] | null
          created_at?: string
          display_name?: string
          division?: Database["public"]["Enums"]["nfl_division"]
          id?: number
          logo?: string
          short_display_name?: string
        }
        Relationships: []
      }
      nhl_game_today: {
        Row: {
          away_team_id: number
          created_at: string
          home_team_id: number
          id: number
          start_time: string
          stream_link_id: number | null
          title: string
          view_price_dollars: number
        }
        Insert: {
          away_team_id: number
          created_at?: string
          home_team_id: number
          id?: number
          start_time: string
          stream_link_id?: number | null
          title: string
          view_price_dollars: number
        }
        Update: {
          away_team_id?: number
          created_at?: string
          home_team_id?: number
          id?: number
          start_time?: string
          stream_link_id?: number | null
          title?: string
          view_price_dollars?: number
        }
        Relationships: [
          {
            foreignKeyName: "nhl_game_today_away_team_id_fkey"
            columns: ["away_team_id"]
            referencedRelation: "nhl_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nhl_game_today_home_team_id_fkey"
            columns: ["home_team_id"]
            referencedRelation: "nhl_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nhl_game_today_stream_link_id_fkey"
            columns: ["stream_link_id"]
            referencedRelation: "stream_link"
            referencedColumns: ["id"]
          }
        ]
      }
      nhl_team: {
        Row: {
          abbreviation: string
          conference: Database["public"]["Enums"]["nhl_conference"]
          created_at: string
          display_name: string
          division: Database["public"]["Enums"]["nhl_division"]
          id: number
          logo: string
          short_display_name: string
        }
        Insert: {
          abbreviation: string
          conference: Database["public"]["Enums"]["nhl_conference"]
          created_at?: string
          display_name: string
          division: Database["public"]["Enums"]["nhl_division"]
          id?: number
          logo: string
          short_display_name: string
        }
        Update: {
          abbreviation?: string
          conference?: Database["public"]["Enums"]["nhl_conference"]
          created_at?: string
          display_name?: string
          division?: Database["public"]["Enums"]["nhl_division"]
          id?: number
          logo?: string
          short_display_name?: string
        }
        Relationships: []
      }
      stream_link: {
        Row: {
          created_at: string
          id: number
          stream_link: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          stream_link: string
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          stream_link?: string
          title?: string
        }
        Relationships: []
      }
      test: {
        Row: {
          asdf: Database["public"]["Enums"]["cfb_conference"] | null
          created_at: string
          id: number
        }
        Insert: {
          asdf?: Database["public"]["Enums"]["cfb_conference"] | null
          created_at?: string
          id?: number
        }
        Update: {
          asdf?: Database["public"]["Enums"]["cfb_conference"] | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      user: {
        Row: {
          id: string
          ids_of_game_streams_user_can_view: number[] | null
        }
        Insert: {
          id: string
          ids_of_game_streams_user_can_view?: number[] | null
        }
        Update: {
          id?: string
          ids_of_game_streams_user_can_view?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cfb_conference:
        | "ACC"
        | "Mid-American"
        | "American"
        | "Mountain West"
        | "Pac-12"
        | "Big 12"
        | "SEC"
        | "Big Ten"
        | "Sun Belt"
        | "Conference USA"
        | "FBS Independents"
      mlb_division: "Central" | "East" | "West"
      mlb_league: "American League" | "National League"
      nfl_conference: "AFC" | "NFC"
      nfl_division: "North" | "South" | "East" | "West"
      nhl_conference: "Eastern" | "Western"
      nhl_division: "Atlantic" | "Metropolitan" | "Central" | "Pacific"
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

