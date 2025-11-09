
-- Migration: 20251109081618

-- Migration: 20251109080020

-- Migration: 20251109034000

-- Migration: 20251109030446

-- Migration: 20251109000313

-- Migration: 20251108233024
-- Create storage bucket for bank statements
INSERT INTO storage.buckets (id, name, public)
VALUES ('bank-statements', 'bank-statements', false);

-- Create policy for authenticated users to upload their own bank statements
CREATE POLICY "Users can upload their own bank statements"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'bank-statements' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy for users to read their own bank statements
CREATE POLICY "Users can view their own bank statements"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'bank-statements' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy for users to delete their own bank statements
CREATE POLICY "Users can delete their own bank statements"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'bank-statements' AND
  auth.uid()::text = (storage.foldername(name))[1]
);





-- Migration: 20251109081134
-- Make bank-statements bucket public to allow uploads without authentication
UPDATE storage.buckets 
SET public = true 
WHERE id = 'bank-statements';


-- Migration: 20251109082011

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can upload their own bank statements" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own bank statements" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own bank statements" ON storage.objects;

-- Create new policies that allow public access for bank-statements bucket
CREATE POLICY "Anyone can upload bank statements"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'bank-statements');

CREATE POLICY "Anyone can view bank statements"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'bank-statements');

CREATE POLICY "Anyone can delete bank statements"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'bank-statements');

