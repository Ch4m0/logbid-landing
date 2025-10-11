-- =====================================================
-- Script para crear buckets de Storage en Supabase
-- =====================================================
-- 
-- Instrucciones:
-- 1. Ve a tu proyecto en Supabase Dashboard
-- 2. Navega a SQL Editor
-- 3. Copia y pega todo este script
-- 4. Ejecuta el script
--
-- =====================================================

-- Crear bucket para certificaciones de agentes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certifications',
  'certifications',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Crear bucket para documentos legales
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'legal-documents',
  'legal-documents',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Políticas de seguridad (Row Level Security)
-- =====================================================

-- Habilitar RLS en storage.objects si no está habilitado
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Política: Permitir a usuarios autenticados subir archivos a pending/
DROP POLICY IF EXISTS "Allow authenticated uploads to pending" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to pending"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id IN ('certifications', 'legal-documents')
  AND (storage.foldername(name))[1] = 'pending'
);

-- Política: Permitir a usuarios autenticados leer sus propios archivos
DROP POLICY IF EXISTS "Allow users to read own files" ON storage.objects;
CREATE POLICY "Allow users to read own files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id IN ('certifications', 'legal-documents')
);

-- Política: Solo administradores pueden eliminar archivos
DROP POLICY IF EXISTS "Allow admins to delete files" ON storage.objects;
CREATE POLICY "Allow admins to delete files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id IN ('certifications', 'legal-documents')
  AND (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'superadmin')
    )
  )
);

-- Política: Solo administradores pueden actualizar archivos
DROP POLICY IF EXISTS "Allow admins to update files" ON storage.objects;
CREATE POLICY "Allow admins to update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('certifications', 'legal-documents')
  AND (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'superadmin')
    )
  )
);

-- Verificar que los buckets fueron creados
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id IN ('certifications', 'legal-documents')
ORDER BY id;


