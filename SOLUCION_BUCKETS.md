# 🔧 Solución: Configuración de Buckets de Storage

## 📋 Resumen del Problema

Los documentos de usuarios que se registran no se están guardando porque **faltan los buckets de Supabase Storage**.

Cuando un usuario se registra como agente o importador, el sistema intenta subir documentos (certificados, RUT, cámara de comercio, etc.) a buckets que no existen, causando errores.

## ✅ Solución Implementada

He creado los siguientes recursos para resolver este problema:

### 1. Scripts Automatizados

#### 📄 `scripts/create-storage-buckets.sql`
Script SQL que puedes ejecutar directamente en Supabase Dashboard para crear:
- ✅ Bucket `certifications` (para certificados de agentes)
- ✅ Bucket `legal-documents` (para documentos legales)
- ✅ Políticas de seguridad (RLS) configuradas correctamente

#### 🔧 `scripts/setup-storage-buckets.ts`
Script TypeScript automatizado (requiere service role key)

### 2. Documentación Completa

- **`scripts/README.md`** - Guía rápida de configuración
- **`scripts/STORAGE_SETUP.md`** - Documentación detallada

### 3. Mejoras en el Código

He mejorado el manejo de errores en:
- ✅ `src/app/register-agent/page.tsx`
- ✅ `src/app/register-importer/page.tsx`

Ahora cuando hay un error al subir archivos, los usuarios verán mensajes claros y específicos en lugar de errores genéricos.

## 🚀 Cómo Implementar la Solución

### Opción 1: SQL Editor (MÁS RÁPIDO - Recomendado)

1. Abre [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto LogBid
3. Ve a **SQL Editor** (menú lateral izquierdo)
4. Haz clic en **New Query**
5. Copia y pega el contenido completo de `scripts/create-storage-buckets.sql`
6. Haz clic en **Run** o presiona `Ctrl/Cmd + Enter`
7. ✅ Deberías ver un resultado confirmando la creación de los buckets

### Opción 2: Script Automatizado

```bash
# 1. Configura la variable de entorno
export SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# 2. Ejecuta el script
npm run setup:storage
```

## 🔍 Verificación

Después de ejecutar cualquiera de las opciones anteriores:

1. Ve a **Storage** en Supabase Dashboard
2. Deberías ver dos buckets:
   - 🔒 `certifications` (Privado)
   - 🔒 `legal-documents` (Privado)

3. Prueba el registro:
   - Abre tu landing page
   - Ve a registro de agente o importador
   - Completa el formulario y sube archivos PDF
   - Los archivos deberían guardarse en `pending/`

## 📊 Estructura de los Buckets

```
certifications/
└── pending/
    ├── 1704123456789_1.pdf  (certificado BASC)
    ├── 1704123456790_2.pdf  (certificado OEA)
    └── ...

legal-documents/
└── pending/
    ├── 1704123456791_rut.pdf
    ├── 1704123456792_camaraComercio.pdf
    ├── 1704123456793_cedulaRepresentante.pdf
    └── ...
```

## 🛡️ Seguridad Configurada

Las políticas de seguridad (RLS) permiten:

✅ **Usuarios públicos** (no autenticados) pueden:
- Subir archivos a la carpeta `pending/` (durante registro)

✅ **Usuarios autenticados** pueden:
- Ver sus propios archivos

✅ **Solo administradores** pueden:
- Eliminar archivos
- Actualizar archivos
- Mover archivos de `pending/` a `approved/`

## ⚠️ Importante

### Después de crear los buckets:

1. **No cambies los nombres** de los buckets (`certifications` y `legal-documents`)
2. **Mantén los buckets privados** (🔒) para seguridad
3. **No elimines las políticas RLS** - son necesarias para seguridad
4. **Límite de archivo: 10MB** - Los archivos más grandes serán rechazados
5. **Solo PDFs permitidos** - Otros formatos serán rechazados

### Monitoreo

Puedes ver los archivos subidos en:
- Supabase Dashboard > Storage > certifications > pending
- Supabase Dashboard > Storage > legal-documents > pending

Los archivos aparecerán con nombres como:
- `1704123456789_1.pdf` (timestamp_certificationId.pdf)
- `1704123456789_rut.pdf` (timestamp_documentType.pdf)

## 🆘 Problemas Comunes

### "Bucket not found"
**Solución**: Ejecuta el script SQL nuevamente

### "Row Level Security policy violation"
**Solución**: Verifica que las políticas RLS se crearon. Re-ejecuta todo el script SQL.

### "File size exceeds limit"
**Solución**: El archivo es mayor a 10MB. Comprime o reduce el tamaño del PDF.

### "Invalid file type"
**Solución**: Solo se permiten archivos PDF.

## 📞 Siguiente Paso

Después de configurar los buckets, deberías:

1. ✅ Probar el registro completo (agente e importador)
2. ✅ Verificar que los archivos aparecen en `pending/`
3. ✅ Crear un proceso de administración para:
   - Revisar archivos pendientes
   - Aprobar/rechazar registros
   - Mover archivos de `pending/` a `approved/`

---

**Fecha de creación**: 3 de octubre de 2025  
**Versión**: 1.0


