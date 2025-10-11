/**
 * Script para crear los buckets de storage necesarios en Supabase
 * 
 * Buckets requeridos:
 * 1. certifications - Para certificados de agentes
 * 2. legal-documents - Para documentos legales (RUT, Cámara de Comercio, etc.)
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupStorageBuckets() {
  console.log('🪣 Setting up Supabase Storage buckets...\n')

  const bucketsToCreate = [
    {
      id: 'certifications',
      name: 'certifications',
      public: false,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['application/pdf']
    },
    {
      id: 'legal-documents',
      name: 'legal-documents',
      public: false,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['application/pdf']
    }
  ]

  // Listar buckets existentes
  const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets()
  
  if (listError) {
    console.error('❌ Error listing buckets:', listError)
    return
  }

  console.log('📋 Existing buckets:', existingBuckets?.map(b => b.name).join(', ') || 'none')
  console.log('')

  // Crear buckets que no existan
  for (const bucket of bucketsToCreate) {
    const exists = existingBuckets?.some(b => b.name === bucket.name)
    
    if (exists) {
      console.log(`✅ Bucket "${bucket.name}" already exists`)
    } else {
      console.log(`📦 Creating bucket "${bucket.name}"...`)
      
      const { data, error } = await supabase.storage.createBucket(bucket.id, {
        public: bucket.public,
        fileSizeLimit: bucket.fileSizeLimit,
        allowedMimeTypes: bucket.allowedMimeTypes
      })

      if (error) {
        console.error(`❌ Error creating bucket "${bucket.name}":`, error)
      } else {
        console.log(`✅ Bucket "${bucket.name}" created successfully`)
      }
    }
  }

  console.log('\n🎉 Storage setup complete!')
}

setupStorageBuckets().catch(console.error)


