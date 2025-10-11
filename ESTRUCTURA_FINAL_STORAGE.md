# 📁 Estructura Final de Storage - Users Pending Registrations

## 🎯 Estructura Definitiva Implementada

### 📦 Bucket Principal
**Nombre**: `users-pending-registrations`

## 📂 Estructura Completa

### Para AGENTES:

```
users-pending-registrations/
└── agents/
    └── {nombre_usuario}/
        ├── {nombre_usuario}_rut.pdf
        ├── {nombre_usuario}_camaraComercio.pdf
        ├── {nombre_usuario}_cedulaRepresentante.pdf
        └── certifications_files/
            ├── {nombre_usuario}_basc.pdf
            ├── {nombre_usuario}_oea.pdf
            ├── {nombre_usuario}_iso_9001.pdf
            ├── {nombre_usuario}_ctpat.pdf
            └── ... (otras certificaciones)
```

**Ejemplo Real - Agente "Juan Pérez García":**
```
users-pending-registrations/
└── agents/
    └── juan_perez_garcia/
        ├── juan_perez_garcia_rut.pdf
        ├── juan_perez_garcia_camaraComercio.pdf
        ├── juan_perez_garcia_cedulaRepresentante.pdf
        └── certifications_files/
            ├── juan_perez_garcia_basc.pdf
            ├── juan_perez_garcia_oea.pdf
            └── juan_perez_garcia_iso_9001.pdf
```

### Para IMPORTADORES (Customers):

```
users-pending-registrations/
└── customers/
    └── {nombre_usuario}/
        ├── {nombre_usuario}_rut.pdf
        ├── {nombre_usuario}_camaraComercio.pdf
        └── {nombre_usuario}_cedulaRepresentante.pdf
```

**Ejemplo Real - Importador "María Rodríguez":**
```
users-pending-registrations/
└── customers/
    └── maria_rodriguez/
        ├── maria_rodriguez_rut.pdf
        ├── maria_rodriguez_camaraComercio.pdf
        └── maria_rodriguez_cedulaRepresentante.pdf
```

## 📝 Detalles de Implementación

### Nomenclatura de Carpetas de Usuario
El nombre del usuario se limpia automáticamente:
- Convierte a minúsculas
- Remueve acentos y tildes
- Reemplaza espacios y caracteres especiales con `_`
- Elimina múltiples `_` consecutivos

**Ejemplos:**
| Nombre Original | Carpeta Generada |
|----------------|------------------|
| Juan Pérez García | `juan_perez_garcia` |
| María José López | `maria_jose_lopez` |
| Carlos O'Brien | `carlos_o_brien` |
| José Andrés Méndez-Torres | `jose_andres_mendez_torres` |

### Nomenclatura de Archivos

**Documentos Legales:**
- Formato: `{nombre_usuario}_{tipo_documento}.pdf`
- Ubicación: Raíz de la carpeta del usuario
- Ejemplos:
  - `juan_perez_garcia_rut.pdf`
  - `juan_perez_garcia_camaraComercio.pdf`
  - `juan_perez_garcia_cedulaRepresentante.pdf`

**Certificaciones (Solo Agentes):**
- Formato: `{nombre_usuario}_{nombre_certificacion}.pdf`
- Ubicación: Subcarpeta `certifications_files/`
- Ejemplos:
  - `juan_perez_garcia_basc.pdf`
  - `juan_perez_garcia_oea.pdf`
  - `juan_perez_garcia_iso_9001.pdf`

### Tipos de Documentos

**Documentos Legales (Todos los Usuarios):**
- `rut` - RUT/NIT de la empresa
- `camaraComercio` - Certificado de Cámara de Comercio
- `cedulaRepresentante` - Cédula del Representante Legal

**Certificaciones (Solo Agentes):**
Los nombres se limpian automáticamente del nombre en la base de datos:
- BASC → `basc`
- OEA → `oea`
- ISO 9001 → `iso_9001`
- C-TPAT → `c_tpat`
- Ninguna → (sin archivo)

## 🔐 Políticas de Seguridad

### Política Activa:
```sql
CREATE POLICY "Public can upload to users-pending-registrations bucket"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'users-pending-registrations'
  AND (storage.foldername(name))[1] IN ('agents', 'customers')
);
```

**Permite:**
- ✅ Usuarios públicos (no autenticados) pueden subir archivos
- ✅ Solo al bucket `users-pending-registrations`
- ✅ Solo a carpetas `agents/` o `customers/`
- ✅ Permite subcarpetas (como `certifications_files/`)

## 📊 Metadata en Base de Datos

### Para Agentes:

```json
{
  "legal_documents": {
    "rut": {
      "file_name": "juan_perez_garcia_rut.pdf",
      "file_path": "agents/juan_perez_garcia/juan_perez_garcia_rut.pdf",
      "file_size": 5418621,
      "uploaded_at": "2025-10-04T03:30:00.000Z"
    },
    "camaraComercio": {
      "file_name": "juan_perez_garcia_camaraComercio.pdf",
      "file_path": "agents/juan_perez_garcia/juan_perez_garcia_camaraComercio.pdf",
      "file_size": 3245876,
      "uploaded_at": "2025-10-04T03:30:01.000Z"
    },
    "cedulaRepresentante": {
      "file_name": "juan_perez_garcia_cedulaRepresentante.pdf",
      "file_path": "agents/juan_perez_garcia/juan_perez_garcia_cedulaRepresentante.pdf",
      "file_size": 2134567,
      "uploaded_at": "2025-10-04T03:30:02.000Z"
    }
  },
  "certification_files": {
    "1": {
      "file_name": "juan_perez_garcia_basc.pdf",
      "file_path": "agents/juan_perez_garcia/certifications_files/juan_perez_garcia_basc.pdf",
      "file_size": 2156432,
      "uploaded_at": "2025-10-04T03:30:03.000Z"
    },
    "2": {
      "file_name": "juan_perez_garcia_oea.pdf",
      "file_path": "agents/juan_perez_garcia/certifications_files/juan_perez_garcia_oea.pdf",
      "file_size": 1876543,
      "uploaded_at": "2025-10-04T03:30:04.000Z"
    }
  }
}
```

### Para Importadores:

```json
{
  "legal_documents": {
    "rut": {
      "file_name": "maria_rodriguez_rut.pdf",
      "file_path": "customers/maria_rodriguez/maria_rodriguez_rut.pdf",
      "file_size": 4321098,
      "uploaded_at": "2025-10-04T03:35:00.000Z"
    },
    "camaraComercio": {
      "file_name": "maria_rodriguez_camaraComercio.pdf",
      "file_path": "customers/maria_rodriguez/maria_rodriguez_camaraComercio.pdf",
      "file_size": 3456789,
      "uploaded_at": "2025-10-04T03:35:01.000Z"
    },
    "cedulaRepresentante": {
      "file_name": "maria_rodriguez_cedulaRepresentante.pdf",
      "file_path": "customers/maria_rodriguez/maria_rodriguez_cedulaRepresentante.pdf",
      "file_size": 2345678,
      "uploaded_at": "2025-10-04T03:35:02.000Z"
    }
  },
  "certification_files": null
}
```

## 🔍 Consultas SQL Útiles

### Ver todos los archivos de un usuario específico:

```sql
SELECT 
  name as archivo,
  metadata->>'size' as tamaño_bytes,
  created_at
FROM storage.objects 
WHERE bucket_id = 'users-pending-registrations'
  AND name LIKE 'agents/juan_perez_garcia/%'
ORDER BY name;
```

### Ver todos los agentes con archivos pendientes:

```sql
SELECT DISTINCT
  (storage.foldername(name))[2] as nombre_usuario,
  COUNT(*) as total_archivos
FROM storage.objects 
WHERE bucket_id = 'users-pending-registrations'
  AND (storage.foldername(name))[1] = 'agents'
GROUP BY (storage.foldername(name))[2]
ORDER BY nombre_usuario;
```

### Ver solo certificaciones de agentes:

```sql
SELECT 
  (storage.foldername(name))[2] as agente,
  name as archivo,
  metadata->>'size' as tamaño
FROM storage.objects 
WHERE bucket_id = 'users-pending-registrations'
  AND (storage.foldername(name))[1] = 'agents'
  AND (storage.foldername(name))[3] = 'certifications_files'
ORDER BY (storage.foldername(name))[2];
```

### Ver solo documentos legales (sin certificaciones):

```sql
SELECT 
  (storage.foldername(name))[1] as rol,
  (storage.foldername(name))[2] as usuario,
  name as archivo
FROM storage.objects 
WHERE bucket_id = 'users-pending-registrations'
  AND (
    (storage.foldername(name))[1] = 'customers'
    OR (
      (storage.foldername(name))[1] = 'agents'
      AND (storage.foldername(name))[3] IS NULL
    )
  )
ORDER BY (storage.foldername(name))[2];
```

## ✅ Ventajas de Esta Estructura

1. **Organización Clara**
   - Separación por rol (agents/customers)
   - Una carpeta por usuario
   - Subcarpeta dedicada para certificaciones

2. **Fácil Navegación**
   - Buscar todos los archivos de un usuario
   - Filtrar solo certificaciones
   - Identificar rápidamente el tipo de documento

3. **Escalabilidad**
   - Soporta miles de usuarios
   - Estructura consistente
   - Fácil de mantener

4. **Auditoría y Cumplimiento**
   - Trazabilidad por usuario
   - Separación de documentos legales y certificaciones
   - Nombres descriptivos sin abrir archivos

## 🚀 Próximos Pasos Sugeridos

1. **Proceso de Aprobación:**
   - Mover carpetas completas de usuarios aprobados
   - Crear bucket `users-approved` con misma estructura
   - Mantener trazabilidad del proceso

2. **Vencimiento de Certificaciones:**
   - Agregar campo `expiration_date` en metadata
   - Notificaciones automáticas de renovación
   - Dashboard de certificaciones próximas a vencer

3. **Historial de Documentos:**
   - Versionar documentos actualizados
   - Mantener historial de cambios
   - Subcarpeta `history/` en cada usuario

---

**Fecha de implementación final**: 4 de octubre de 2025  
**Versión**: 3.0 (Definitiva)

