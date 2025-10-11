# 📁 Nueva Estructura de Storage - Users Pending Registrations

## 🎯 Cambios Implementados

Se ha reorganizado completamente la estructura de carpetas de almacenamiento de documentos para mejorar la organización y facilitar la gestión de usuarios pendientes.

## 📂 Estructura Anterior vs Nueva

### ❌ Anterior (Obsoleta)
```
certifications/
└── pending/
    ├── 1759520783566_1.pdf
    ├── 1759520783567_2.pdf
    └── ...

legal-documents/
└── pending/
    ├── 1759520783568_rut.pdf
    ├── 1759520783569_camaraComercio.pdf
    └── ...
```

### ✅ Nueva (Actual)
```
certifications/
└── users-pending-registrations/
    ├── agents/
    │   ├── juan_perez_garcia/
    │   │   ├── juan_perez_garcia_basc.pdf
    │   │   ├── juan_perez_garcia_oea.pdf
    │   │   └── juan_perez_garcia_iso_9001.pdf
    │   └── maria_rodriguez/
    │       ├── maria_rodriguez_basc.pdf
    │       └── maria_rodriguez_oea.pdf
    └── customers/
        └── (sin certificaciones)

legal-documents/
└── users-pending-registrations/
    ├── agents/
    │   ├── juan_perez_garcia/
    │   │   ├── juan_perez_garcia_rut.pdf
    │   │   ├── juan_perez_garcia_camaraComercio.pdf
    │   │   └── juan_perez_garcia_cedulaRepresentante.pdf
    │   └── maria_rodriguez/
    │       ├── maria_rodriguez_rut.pdf
    │       ├── maria_rodriguez_camaraComercio.pdf
    │       └── maria_rodriguez_cedulaRepresentante.pdf
    └── customers/
        └── carlos_mendez/
            ├── carlos_mendez_rut.pdf
            ├── carlos_mendez_camaraComercio.pdf
            └── carlos_mendez_cedulaRepresentante.pdf
```

## 🔧 Características de la Nueva Estructura

### 1. **Organización por Rol**
- `agents/` - Documentos de agentes aduanales
- `customers/` - Documentos de importadores

### 2. **Carpeta Individual por Usuario**
- Cada usuario tiene su propia carpeta con su nombre limpio
- Ejemplo: "Juan Pérez García" → `juan_perez_garcia`

### 3. **Nombres de Archivos Descriptivos**
- Formato: `{nombre_usuario}_{tipo_documento}.{extension}`
- Ejemplos:
  - `juan_perez_garcia_rut.pdf`
  - `juan_perez_garcia_basc.pdf`
  - `maria_rodriguez_camaraComercio.pdf`

### 4. **Limpieza Automática de Nombres**
El sistema automáticamente limpia los nombres de usuario:
- Convierte a minúsculas
- Remueve acentos y tildes
- Reemplaza espacios y caracteres especiales con `_`
- Elimina múltiples `_` consecutivos

#### Ejemplos:
| Nombre Original | Nombre Limpio |
|----------------|---------------|
| Juan Pérez García | `juan_perez_garcia` |
| María José Rodríguez | `maria_jose_rodriguez` |
| Carlos Andrés Méndez-López | `carlos_andres_mendez_lopez` |
| José O'Brien | `jose_o_brien` |

## 🔐 Políticas de Seguridad Actualizadas

### Política Implementada

```sql
CREATE POLICY "Public can upload to users-pending-registrations"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id IN ('certifications', 'legal-documents')
  AND (storage.foldername(name))[1] = 'users-pending-registrations'
  AND (storage.foldername(name))[2] IN ('agents', 'customers')
);
```

Esta política permite:
- ✅ Subidas públicas (usuarios no autenticados durante registro)
- ✅ Solo a carpetas `users-pending-registrations/agents/` o `/customers/`
- ✅ Estructura organizada y segura

## 📊 Beneficios de la Nueva Estructura

### Para Administradores:
1. **Fácil localización**: Encontrar documentos de un usuario específico
2. **Organización por rol**: Separación clara entre agentes y clientes
3. **Nombres descriptivos**: Identificar documentos sin abrir archivos
4. **Auditoría simple**: Revisar todos los documentos de un usuario en un solo lugar

### Para el Sistema:
1. **Escalabilidad**: Maneja miles de usuarios sin problemas
2. **Mantenimiento**: Fácil limpieza de registros antiguos
3. **Backup selectivo**: Respaldar por usuario o rol
4. **Migración**: Mover documentos de pending a approved por carpeta

## 🚀 Migración de Datos Existentes

### Para archivos en la estructura antigua:

Los archivos en `pending/` con timestamps seguirán funcionando pero se recomienda:

1. **Dejar los archivos antiguos** - No es necesario moverlos inmediatamente
2. **Nueva estructura solo para registros nuevos** - A partir de ahora
3. **Limpieza gradual** - Después de aprobar usuarios, eliminar archivos viejos

### Script SQL para limpiar archivos antiguos (OPCIONAL):

```sql
-- Ver archivos en la estructura antigua
SELECT 
  bucket_id,
  name,
  created_at
FROM storage.objects 
WHERE (storage.foldername(name))[1] = 'pending'
ORDER BY created_at DESC;

-- DESPUÉS de aprobar usuarios, eliminar archivos antiguos:
-- DELETE FROM storage.objects 
-- WHERE (storage.foldername(name))[1] = 'pending'
--   AND created_at < '2025-10-03';  -- Ajustar fecha según necesidad
```

## 📝 Metadata en Base de Datos

La metadata guardada en `pending_registrations` ahora incluye:

```json
{
  "legal_documents": {
    "rut": {
      "file_name": "juan_perez_garcia_rut.pdf",
      "file_path": "users-pending-registrations/agents/juan_perez_garcia/juan_perez_garcia_rut.pdf",
      "file_size": 5418621,
      "uploaded_at": "2025-10-03T20:30:00.000Z"
    },
    "camaraComercio": {
      "file_name": "juan_perez_garcia_camaraComercio.pdf",
      "file_path": "users-pending-registrations/agents/juan_perez_garcia/juan_perez_garcia_camaraComercio.pdf",
      "file_size": 3245876,
      "uploaded_at": "2025-10-03T20:30:01.000Z"
    }
  },
  "certification_files": {
    "1": {
      "file_name": "juan_perez_garcia_basc.pdf",
      "file_path": "users-pending-registrations/agents/juan_perez_garcia/juan_perez_garcia_basc.pdf",
      "file_size": 2156432,
      "uploaded_at": "2025-10-03T20:30:02.000Z"
    }
  }
}
```

## 🔍 Consultas Útiles

### Ver todos los usuarios pendientes con sus archivos:

```sql
SELECT 
  pr.full_name,
  pr.email,
  pr.role,
  pr.legal_documents,
  pr.certification_files,
  pr.created_at
FROM pending_registrations pr
WHERE pr.status = 'pending'
ORDER BY pr.created_at DESC;
```

### Ver archivos en la nueva estructura:

```sql
SELECT 
  bucket_id,
  (storage.foldername(name))[2] as role,
  (storage.foldername(name))[3] as user_folder,
  name as full_path,
  metadata->>'size' as size_bytes,
  created_at
FROM storage.objects 
WHERE (storage.foldername(name))[1] = 'users-pending-registrations'
ORDER BY created_at DESC;
```

## ⚠️ Importante

1. **No cambies los nombres de carpeta manualmente** - El sistema los genera automáticamente
2. **Respeta la estructura** - No crear carpetas adicionales
3. **Archivos antiguos** - Los de `pending/` seguirán siendo accesibles
4. **Nombres únicos** - Si dos usuarios tienen el mismo nombre, el timestamp del registro los diferencia en la base de datos

---

**Fecha de implementación**: 3 de octubre de 2025  
**Versión**: 2.0

