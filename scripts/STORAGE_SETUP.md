# Configuración de Supabase Storage

## Buckets Requeridos

La aplicación LogBid requiere dos buckets de Supabase Storage para almacenar documentos de usuarios en estado pendiente:

### 1. `certifications`
- **Propósito**: Almacenar certificados de agentes (BASC, OEA, ISO, etc.)
- **Acceso**: Privado
- **Tamaño máximo**: 10MB por archivo
- **Tipos permitidos**: PDF solamente
- **Estructura**:
  - `pending/` - Archivos de usuarios pendientes de aprobación
  - `approved/` - Archivos de usuarios aprobados (se mueven aquí después de la aprobación)

### 2. `legal-documents`
- **Propósito**: Almacenar documentos legales (RUT/NIT, Cámara de Comercio, Cédula Representante Legal)
- **Acceso**: Privado
- **Tamaño máximo**: 10MB por archivo
- **Tipos permitidos**: PDF solamente
- **Estructura**:
  - `pending/` - Archivos de usuarios pendientes de aprobación
  - `approved/` - Archivos de usuarios aprobados (se mueven aquí después de la aprobación)

## Opción 1: Usar el Script Automatizado

1. Asegúrate de tener la clave de servicio de Supabase:
   ```bash
   export SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   ```

2. Ejecuta el script:
   ```bash
   npm run setup:storage
   ```

## Opción 2: Crear Manualmente en Supabase Dashboard

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **Storage** en el menú lateral
3. Haz clic en **Create a new bucket**

### Para el bucket `certifications`:
- **Name**: `certifications`
- **Public bucket**: ❌ (desactivado)
- **File size limit**: 10485760 (10MB)
- **Allowed MIME types**: `application/pdf`

### Para el bucket `legal-documents`:
- **Name**: `legal-documents`
- **Public bucket**: ❌ (desactivado)
- **File size limit**: 10485760 (10MB)
- **Allowed MIME types**: `application/pdf`

## Configurar Políticas de Seguridad (RLS)

Después de crear los buckets, debes configurar políticas de Row Level Security:

### Para ambos buckets:

1. **Política de Subida (INSERT)** - Solo usuarios autenticados
   ```sql
   CREATE POLICY "Usuarios autenticados pueden subir archivos"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'certifications' OR bucket_id = 'legal-documents');
   ```

2. **Política de Lectura (SELECT)** - Solo el dueño del archivo o administradores
   ```sql
   CREATE POLICY "Usuarios pueden ver sus propios archivos"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (
     bucket_id IN ('certifications', 'legal-documents')
     AND (
       auth.uid()::text = (storage.foldername(name))[1]
       OR auth.jwt() ->> 'role' = 'admin'
     )
   );
   ```

3. **Política de Eliminación (DELETE)** - Solo administradores
   ```sql
   CREATE POLICY "Solo admins pueden eliminar archivos"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (
     bucket_id IN ('certifications', 'legal-documents')
     AND auth.jwt() ->> 'role' = 'admin'
   );
   ```

## Verificación

Para verificar que los buckets están configurados correctamente:

1. Ve a Storage en Supabase Dashboard
2. Deberías ver dos buckets: `certifications` y `legal-documents`
3. Ambos deben ser privados (🔒 icono de candado)
4. Prueba subir un archivo PDF desde la interfaz de registro

## Troubleshooting

### Error: "Bucket no encontrado"
- Verifica que los buckets existan en Supabase Dashboard
- Confirma que los nombres sean exactamente `certifications` y `legal-documents`

### Error: "No tienes permiso para subir archivos"
- Verifica las políticas RLS
- Asegúrate de que el usuario esté autenticado (para desarrollo, puedes temporalmente hacer los buckets públicos)

### Los archivos no se suben
- Verifica el tamaño del archivo (máximo 10MB)
- Confirma que el tipo de archivo sea PDF
- Revisa la consola del navegador para errores específicos


