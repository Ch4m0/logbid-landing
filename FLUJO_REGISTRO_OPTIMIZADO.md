# 🔄 Flujo de Registro Optimizado

## 📋 Problema Anterior

**Flujo Antiguo (INCORRECTO):**
```
1. Validar formulario
2. Verificar email en profiles ✓
3. 📤 SUBIR ARCHIVOS A STORAGE ← ❌ PROBLEMA
4. 💾 Crear registro en pending_registrations
5. ✅ Registro completado
```

**Problemas:**
- ❌ Si el registro fallaba, los archivos quedaban huérfanos en storage
- ❌ Archivos innecesarios si hay un error de validación
- ❌ Desperdicio de ancho de banda y storage
- ❌ Difícil de limpiar archivos sin referencias

## ✅ Nuevo Flujo (OPTIMIZADO)

**Flujo Actual (CORRECTO):**
```
1. Validar formulario básico ✓
2. Verificar email en profiles ✓
3. Verificar teléfono en profiles ✓
4. Verificar email en pending_registrations ✓
5. 💾 CREAR REGISTRO en pending_registrations (sin archivos)
6. 📤 SUBIR ARCHIVOS A STORAGE
7. 📝 ACTUALIZAR registro con rutas de archivos
8. ✅ Registro completado
```

**Ventajas:**
- ✅ Usuario existe en DB antes de subir archivos
- ✅ Archivos siempre tienen un registro asociado
- ✅ Si falla la subida, el usuario ya está registrado
- ✅ Fácil auditoría y limpieza
- ✅ Mejor manejo de errores

## 📊 Flujo Detallado

### Para AGENTES:

```mermaid
1. Usuario completa formulario
   ↓
2. Validaciones básicas
   ├─ Contraseñas coinciden?
   ├─ Contraseña >= 6 caracteres?
   ├─ Mercados seleccionados?
   └─ Documentos subidos?
   ↓
3. Verificar email en 'profiles'
   ├─ ¿Email existe? → Error: "Email ya registrado"
   └─ No existe → Continuar
   ↓
4. Verificar teléfono en 'profiles'
   ├─ ¿Teléfono existe? → Error: "Teléfono ya registrado"
   └─ No existe → Continuar
   ↓
5. Verificar email en 'pending_registrations'
   ├─ Status 'pending'? → Error: "Registro pendiente de aprobación"
   ├─ Status 'approved'? → Error: "Ya aprobado, inicia sesión"
   └─ No existe → Continuar
   ↓
6. Crear hash de contraseña (bcrypt)
   ↓
7. Limpiar nombre de usuario
   │  "Juan Pérez García" → "juan_perez_garcia"
   ↓
8. INSERT en 'pending_registrations'
   │  ├─ email, full_name, phone
   │  ├─ password_hash, role, language
   │  ├─ company info, rut_number
   │  ├─ selected_markets, selected_certifications
   │  └─ legal_documents: null ← Se actualizará después
   │     certification_files: null ← Se actualizará después
   ↓
9. ¿Registro creado exitosamente?
   ├─ No → Error: "No se pudo crear registro"
   └─ Sí → Obtener ID de registro y continuar
   ↓
10. SUBIR CERTIFICACIONES (si hay)
    │  Para cada certificación:
    │  ├─ Limpiar nombre de certificación
    │  ├─ Crear nombre: {usuario}_{certificacion}.pdf
    │  ├─ Ruta: agents/{usuario}/certifications_files/
    │  └─ Upload a bucket 'users-pending-registrations'
    ↓
11. SUBIR DOCUMENTOS LEGALES
    │  Para cada documento (rut, camaraComercio, cedulaRepresentante):
    │  ├─ Crear nombre: {usuario}_{documento}.pdf
    │  ├─ Ruta: agents/{usuario}/
    │  └─ Upload a bucket 'users-pending-registrations'
    ↓
12. UPDATE 'pending_registrations'
    │  ├─ legal_documents: {rutas y metadata}
    │  └─ certification_files: {rutas y metadata}
    ↓
13. ✅ Registro completado exitosamente
    └─ Mostrar mensaje de éxito con ID
```

### Para IMPORTADORES (Customers):

```
1-9. [Igual que agentes, excepto no tiene certificaciones]
   ↓
10. SUBIR DOCUMENTOS LEGALES
    │  Para cada documento (rut, camaraComercio, cedulaRepresentante):
    │  ├─ Crear nombre: {usuario}_{documento}.pdf
    │  ├─ Ruta: customers/{usuario}/
    │  └─ Upload a bucket 'users-pending-registrations'
    ↓
11. UPDATE 'pending_registrations'
    │  └─ legal_documents: {rutas y metadata}
    ↓
12. ✅ Registro completado exitosamente
```

## 🔒 Validaciones Implementadas

### 1. **Validación en `profiles`** (Usuarios ya aprobados)
```typescript
// Verificar email
const { data: existingProfiles } = await supabase
  .from('profiles')
  .select('email, created_at')
  .eq('email', formData.email)

if (existingProfiles && existingProfiles.length > 0) {
  return error('Email ya registrado')
}

// Verificar teléfono
const { data: existingPhones } = await supabase
  .from('profiles')
  .select('email, phone')
  .eq('phone', formData.phone)

if (existingPhones && existingPhones.length > 0) {
  return error('Teléfono ya registrado')
}
```

### 2. **Validación en `pending_registrations`** (Usuarios pendientes)
```typescript
const { data: existingPending } = await supabase
  .from('pending_registrations')
  .select('email, status, created_at')
  .eq('email', formData.email)

if (existingPending && existingPending.length > 0) {
  const registration = existingPending[0]
  
  if (registration.status === 'pending') {
    return error('Registro pendiente de aprobación')
  }
  if (registration.status === 'approved') {
    return error('Registro ya aprobado')
  }
}
```

## 📝 Estructura de Datos en Base de Datos

### Registro Inicial (Paso 8):
```json
{
  "id": "uuid-generado",
  "email": "juan.perez@example.com",
  "full_name": "Juan Pérez García",
  "phone": "+57 300 123 4567",
  "password_hash": "$2a$10$...",
  "role": "agent",
  "language": "es",
  "company_id": 123,
  "rut_number": "900123456-7",
  "selected_markets": [1, 2, 3],
  "selected_certifications": [1, 2],
  "legal_documents": null,        ← Se actualiza después
  "certification_files": null,    ← Se actualiza después
  "status": "pending",
  "created_at": "2025-10-04T04:00:00Z"
}
```

### Después de Subir Archivos (Paso 12):
```json
{
  "id": "uuid-generado",
  // ... campos anteriores ...
  "legal_documents": {
    "rut": {
      "file_name": "juan_perez_garcia_rut.pdf",
      "file_path": "agents/juan_perez_garcia/juan_perez_garcia_rut.pdf",
      "file_size": 5418621,
      "uploaded_at": "2025-10-04T04:00:05Z"
    },
    "camaraComercio": {
      "file_name": "juan_perez_garcia_camaraComercio.pdf",
      "file_path": "agents/juan_perez_garcia/juan_perez_garcia_camaraComercio.pdf",
      "file_size": 3245876,
      "uploaded_at": "2025-10-04T04:00:06Z"
    },
    "cedulaRepresentante": {
      "file_name": "juan_perez_garcia_cedulaRepresentante.pdf",
      "file_path": "agents/juan_perez_garcia/juan_perez_garcia_cedulaRepresentante.pdf",
      "file_size": 2134567,
      "uploaded_at": "2025-10-04T04:00:07Z"
    }
  },
  "certification_files": {
    "1": {
      "file_name": "juan_perez_garcia_basc.pdf",
      "file_path": "agents/juan_perez_garcia/certifications_files/juan_perez_garcia_basc.pdf",
      "file_size": 2156432,
      "uploaded_at": "2025-10-04T04:00:08Z"
    },
    "2": {
      "file_name": "juan_perez_garcia_oea.pdf",
      "file_path": "agents/juan_perez_garcia/certifications_files/juan_perez_garcia_oea.pdf",
      "file_size": 1876543,
      "uploaded_at": "2025-10-04T04:00:09Z"
    }
  }
}
```

## 🔍 Manejo de Errores

### Si Falla la Creación del Registro (Paso 8):
```
❌ Error → Usuario NO creado
✓ NO se suben archivos
✓ Mensaje de error claro al usuario
✓ No hay archivos huérfanos
```

### Si Falla la Subida de Archivos (Paso 10-11):
```
✓ Usuario YA está creado en pending_registrations
❌ Error al subir archivo específico
✓ Se muestra error claro con el archivo que falló
✓ Registro permanece con legal_documents: null
✓ Admin puede pedir al usuario que reintente
```

### Si Falla el Update Final (Paso 12):
```
✓ Usuario YA está creado
✓ Archivos YA están en storage
❌ Solo falla guardar las rutas en la DB
⚠️ Se registra warning en console
✓ Admin puede reconstruir rutas manualmente
```

## 🧹 Limpieza y Mantenimiento

### Registros Incompletos:
```sql
-- Encontrar registros sin archivos (posible problema)
SELECT 
  id,
  email,
  full_name,
  created_at,
  legal_documents,
  certification_files
FROM pending_registrations
WHERE status = 'pending'
  AND (
    legal_documents IS NULL 
    OR certification_files IS NULL
  )
ORDER BY created_at DESC;
```

### Archivos Huérfanos (No deberían existir):
```sql
-- Archivos sin registro asociado
SELECT 
  o.name,
  o.created_at
FROM storage.objects o
WHERE o.bucket_id = 'users-pending-registrations'
  AND NOT EXISTS (
    SELECT 1 
    FROM pending_registrations pr
    WHERE o.name LIKE '%' || 
      lower(
        regexp_replace(pr.full_name, '[^a-zA-Z0-9]', '_', 'g')
      ) || '%'
  );
```

## 📊 Beneficios del Nuevo Flujo

1. **Integridad de Datos**
   - ✅ Archivos siempre tienen registro asociado
   - ✅ Fácil auditoría y trazabilidad
   - ✅ Sin archivos huérfanos

2. **Eficiencia**
   - ✅ No se suben archivos innecesarios
   - ✅ Validaciones antes de usar ancho de banda
   - ✅ Mejor uso del storage

3. **Experiencia de Usuario**
   - ✅ Mensajes de error más claros
   - ✅ Validación temprana
   - ✅ Estado del registro siempre conocido

4. **Mantenibilidad**
   - ✅ Código más limpio y organizado
   - ✅ Fácil debugging
   - ✅ Logs más informativos

## 🚀 Próximos Pasos Sugeridos

1. **Retry Automático**
   - Reintentar subida de archivos en caso de fallo
   - Máximo 3 intentos

2. **Progress Indicator**
   - Mostrar progreso de subida de archivos
   - "Subiendo 1 de 3 archivos..."

3. **Validación de Tamaño**
   - Verificar tamaño antes de subir
   - Comprimir PDFs grandes automáticamente

4. **Cleanup Job**
   - Tarea programada para limpiar registros incompletos
   - Eliminar archivos de registros rechazados

---

**Fecha de implementación**: 4 de octubre de 2025  
**Versión**: 1.0

