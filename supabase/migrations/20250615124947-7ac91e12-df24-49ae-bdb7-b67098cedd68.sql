
-- Drop the existing clipboard_areas table and recreate it with room codes
DROP TABLE IF EXISTS public.clipboard_areas;

-- Create a new table for clipboard rooms with 6-digit codes
CREATE TABLE public.clipboard_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT NOT NULL UNIQUE,
  area_name TEXT NOT NULL,
  content TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_code, area_name)
);

-- Remove RLS since we don't need authentication anymore
ALTER TABLE public.clipboard_rooms DISABLE ROW LEVEL SECURITY;

-- Create a function to generate 6-digit room codes
CREATE OR REPLACE FUNCTION generate_room_code()
RETURNS TEXT AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at and last_accessed columns
CREATE TRIGGER update_clipboard_rooms_updated_at 
    BEFORE UPDATE ON public.clipboard_rooms 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create an index for faster room code lookups
CREATE INDEX idx_clipboard_rooms_room_code ON public.clipboard_rooms(room_code);
