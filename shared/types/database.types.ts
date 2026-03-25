/**
 * Auto-generated Supabase types will go here.
 * Run `npx supabase gen types typescript` to generate.
 *
 * For now, this is a placeholder. Once the DB schema is
 * created, this file will be replaced with generated types.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
