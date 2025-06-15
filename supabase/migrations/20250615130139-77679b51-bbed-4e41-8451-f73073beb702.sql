
-- Drop the incorrect unique constraint on the room_code column
ALTER TABLE public.clipboard_rooms DROP CONSTRAINT IF EXISTS clipboard_rooms_room_code_key;
