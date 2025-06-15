
-- Create a table for storing clipboard data
CREATE TABLE public.clipboard_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  area_name TEXT NOT NULL,
  content TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, area_name)
);

-- Add Row Level Security (RLS) to ensure users can only see their own clipboard data
ALTER TABLE public.clipboard_areas ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own clipboard areas
CREATE POLICY "Users can view their own clipboard areas" 
  ON public.clipboard_areas 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own clipboard areas
CREATE POLICY "Users can create their own clipboard areas" 
  ON public.clipboard_areas 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own clipboard areas
CREATE POLICY "Users can update their own clipboard areas" 
  ON public.clipboard_areas 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own clipboard areas
CREATE POLICY "Users can delete their own clipboard areas" 
  ON public.clipboard_areas 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_clipboard_areas_updated_at 
    BEFORE UPDATE ON public.clipboard_areas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
