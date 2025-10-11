# Scripts de Configuración de LogBid

Este directorio contiene scripts útiles para configurar y mantener la infraestructura de LogBid.

## 📦 Configuración de Storage (Buckets de Supabase)

### Problema

Si ves errores como:
- "Bucket not found"
- "Error al subir certificado"
- "Error al subir documento legal"

Es porque los buckets de Supabase Storage no están configurados.

### Solución Rápida (Recomendada)

**Opción 1: Usando SQL Editor en Supabase Dashboard**

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto LogBid
3. Navega a **SQL Editor** en el menú lateral
4. Abre el archivo [`create-storage-buckets.sql`](./create-storage-buckets.sql)
5. Copia TODO el contenido
6. Pégalo en el SQL Editor
7. Haz clic en **Run**

¡Listo! Los buckets y políticas de seguridad están configurados.

**Opción 2: Usando el Script TypeScript**

1. Obtén tu Service Role Key de Supabase:
   - Ve a Project Settings > API
   - Copia el "service_role" key (⚠️ Mantenlo secreto)

2. Crea un archivo `.env.local` en la raíz del proyecto:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_proyecto
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   ```

3. Ejecuta el script:
   ```bash
   npm run setup:storage
   ```

### ¿Qué buckets se crean?

1. **`certifications`**
   - Para certificados de agentes (BASC, OEA, ISO, etc.)
   - Archivos PDF de máximo 10MB
   - Privado (solo accesible con autenticación)

2. **`legal-documents`**
   - Para documentos legales (RUT, Cámara de Comercio, Cédula)
   - Archivos PDF de máximo 10MB
   - Privado (solo accesible con autenticación)

### Estructura de Carpetas

Cada bucket tiene la siguiente estructura:
```
bucket-name/
├── pending/          # Archivos de usuarios pendientes de aprobación
│   ├── 1234567_rut.pdf
│   ├── 1234567_camaraComercio.pdf
│   └── ...
└── approved/         # Archivos de usuarios aprobados (futuro)
    └── ...
```

### Verificación

Para verificar que todo está configurado correctamente:

1. Ve a **Storage** en Supabase Dashboard
2. Deberías ver dos buckets con 🔒 (privados):
   - `certifications`
   - `legal-documents`
3. Intenta registrar un usuario desde la landing page
4. Los archivos deberían aparecer en `bucket-name/pending/`

### Troubleshooting

#### Error: "Bucket not found"
- **Solución**: Ejecuta el script SQL o TypeScript para crear los buckets

#### Error: "Row Level Security policy violation"
- **Solución**: Verifica que las políticas RLS se crearon correctamente
- Re-ejecuta el script SQL completo

#### Los archivos no se suben
- **Causa 1**: El archivo excede 10MB
  - **Solución**: Reduce el tamaño del PDF
- **Causa 2**: El archivo no es PDF
  - **Solución**: Convierte el archivo a PDF
- **Causa 3**: Problema de conexión
  - **Solución**: Revisa la consola del navegador para más detalles

## 📚 Más Información

- [STORAGE_SETUP.md](./STORAGE_SETUP.md) - Documentación detallada sobre storage
- [create-storage-buckets.sql](./create-storage-buckets.sql) - Script SQL para crear buckets
- [setup-storage-buckets.ts](./setup-storage-buckets.ts) - Script TypeScript automatizado

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en la consola del navegador (F12)
2. Verifica los buckets en Supabase Dashboard > Storage
3. Comprueba las políticas RLS en SQL Editor
4. Contacta al equipo de desarrollo con capturas de pantalla de los errores


