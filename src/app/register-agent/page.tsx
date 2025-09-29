'use client'
import LanguageSelector from '@/components/LanguageSelector'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/hooks/useTranslation'
import { useSendWelcomeEmail } from '@/hooks/useSendWelcomeEmail'
import {
    ArrowRight,
    ArrowLeft,
    Award,
    Building2,
    CheckCircle,
    Clock,
    FileCheck,
    Globe,
    Lock,
    Package,
    Star,
    Target,
    TrendingUp,
    UserPlus,
    Users,
    Zap
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/utils/supabase/client'

interface Company {
  id: number
  name: string
}

interface Market {
  id: number
  name: string
}

interface FormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role: string
  language: string
  companyName: string
  companyId: string
  rut: string
  camaraComercioNumber: string
  camaraComercioDate: string
  cedulaRepresentanteLegal: string
}

export default function RegisterAgentPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [markets, setMarkets] = useState<Market[]>([])
  const [certifications, setCertifications] = useState<{id: number, name: string}[]>([])
  const [selectedMarkets, setSelectedMarkets] = useState<number[]>([])
  const [selectedCertifications, setSelectedCertifications] = useState<number[]>([])
  const [certificationFiles, setCertificationFiles] = useState<{[key: number]: File | null}>({})
  const [legalDocumentFiles, setLegalDocumentFiles] = useState<{[key: string]: File | null}>({})
  const [isCreatingNewCompany, setIsCreatingNewCompany] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const { sendWelcomeEmail } = useSendWelcomeEmail()

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'agent', // Fixed role for agent registration
    language: 'es',
    companyName: '',
    companyId: '',
    rut: '',
    camaraComercioNumber: '',
    camaraComercioDate: '',
    cedulaRepresentanteLegal: ''
  })

  useEffect(() => {
    const loadData = async () => {
      console.log('🔄 Loading markets and companies...')
      const supabase = createSupabaseClient()
      
      console.log('📊 Fetching markets...')
      const { data: marketsData, error: marketsError } = await supabase
        .from('markets')
        .select('id, name')
        .order('name')
      
      console.log('Markets result:', { marketsData, marketsError })
      if (marketsData) {
        setMarkets(marketsData)
        console.log('✅ Markets loaded:', marketsData.length)
      } else {
        console.error('❌ No markets data:', marketsError)
      }

      console.log('🏢 Fetching companies...')
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('id, name')
        .order('name')
      
      console.log('Companies result:', { companiesData, companiesError })
      if (companiesData) {
        setCompanies(companiesData)
        console.log('✅ Companies loaded:', companiesData.length)
      } else {
        console.error('❌ No companies data:', companiesError)
      }

      console.log('🎓 Fetching certifications...')
      const { data: certificationsData, error: certificationsError } = await supabase
        .from('certifications')
        .select('id, name')
        .eq('is_active', true)
        .order('id')
      
      console.log('Certifications result:', { certificationsData, certificationsError })
      if (certificationsData) {
        setCertifications(certificationsData)
        console.log('✅ Certifications loaded:', certificationsData.length)
      } else {
        console.error('❌ No certifications data:', certificationsError)
      }
    }

    loadData()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMarketToggle = (marketId: number) => {
    setSelectedMarkets(prev => 
      prev.includes(marketId)
        ? prev.filter(id => id !== marketId)
        : [...prev, marketId]
    )
  }

  const handleCertificationToggle = (certificationId: number) => {
    setSelectedCertifications(prev => {
      // Buscar el ID de "Ninguna" (ID 9 según la base de datos)
      const ningunaId = certifications.find(cert => cert.name === "Ninguna")?.id || 9
      
      if (certificationId === ningunaId) {
        // Si selecciona "Ninguna", deseleccionar todas las demás y limpiar archivos
        setCertificationFiles({})
        return prev.includes(ningunaId) ? [] : [ningunaId]
      } else {
        // Si selecciona cualquier otra certificación, quitar "Ninguna" y toggle la certificación
        const withoutNinguna = prev.filter(id => id !== ningunaId)
        const newSelection = withoutNinguna.includes(certificationId)
          ? withoutNinguna.filter(id => id !== certificationId)
          : [...withoutNinguna, certificationId]
        
        // Si deselecciona una certificación, remover su archivo
        if (withoutNinguna.includes(certificationId)) {
          setCertificationFiles(prevFiles => {
            const newFiles = { ...prevFiles }
            delete newFiles[certificationId]
            return newFiles
          })
        }
        
        return newSelection
      }
    })
  }

  const handleFileChange = (certificationId: number, file: File | null) => {
    setCertificationFiles(prev => ({
      ...prev,
      [certificationId]: file
    }))
  }

  const handleLegalDocumentFileChange = (documentType: string, file: File | null) => {
    setLegalDocumentFiles(prev => ({
      ...prev,
      [documentType]: file
    }))
  }

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setError('El nombre es requerido')
      return false
    }
    if (!formData.email.trim()) {
      setError('El email es requerido')
      return false
    }
    if (!formData.phone.trim()) {
      setError('El teléfono es requerido')
      return false
    }
    if (!formData.password.trim()) {
      setError('La contraseña es requerida')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }
    if (selectedMarkets.length === 0) {
      setError('Debes seleccionar al menos un mercado')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    // Validar RUT
    if (!formData.rut.trim()) {
      setError('El número RUT/NIT es requerido')
      return false
    }
    if (!legalDocumentFiles['rut']) {
      setError('El documento RUT es requerido')
      return false
    }

    // Validar Cámara de Comercio
    if (!legalDocumentFiles['camaraComercio']) {
      setError('El certificado de Cámara de Comercio es requerido')
      return false
    }

    // Validar Cédula Representante Legal
    if (!legalDocumentFiles['cedulaRepresentante']) {
      setError('La cédula del representante legal es requerida')
      return false
    }

    // Validar al menos una certificación seleccionada
    if (selectedCertifications.length === 0) {
      setError('Debes seleccionar al menos una certificación')
      return false
    }

    // Si se seleccionaron certificaciones (excepto "Ninguna"), validar que tengan PDFs
    const hasNonNullCertifications = selectedCertifications.some(certId => {
      const cert = certifications.find(c => c.id === certId)
      return cert && cert.name !== "Ninguna"
    })

    if (hasNonNullCertifications) {
      const missingCertificationFiles = selectedCertifications.some(certId => {
        const cert = certifications.find(c => c.id === certId)
        return cert && cert.name !== "Ninguna" && !certificationFiles[certId]
      })

      if (missingCertificationFiles) {
        setError('Debes subir los documentos PDF de todas las certificaciones seleccionadas')
        return false
      }
    }

    return true
  }

  const handleNextStep = () => {
    setError(null)
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(1)
    setError(null)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validar paso 2 antes de proceder
    if (!validateStep2()) {
      setIsLoading(false)
      return
    }

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden')
        return
      }

      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres')
        return
      }

      if (!formData.role) {
        setError('Debe seleccionar un rol')
        return
      }

      if (selectedMarkets.length === 0) {
        setError('Debe seleccionar al menos un mercado')
        return
      }

      const supabase = createSupabaseClient()

      // Verificar si el email ya existe
      console.log('🔍 Checking if email already exists:', formData.email)
      const { data: existingProfiles, error: checkError } = await supabase
        .from('profiles')
        .select('email, created_at')
        .eq('email', formData.email)

      if (checkError) {
        console.error('❌ Error checking existing email:', checkError)
        setError('Error al verificar el email. Por favor intenta nuevamente.')
        return
      } 
      
      if (existingProfiles && existingProfiles.length > 0) {
        console.log('❌ Email already exists:', existingProfiles[0])
        setError(`Este email ya está registrado. Por favor usa un email diferente.`)
        return
      }

      // Verificar si el teléfono ya existe (solo si se proporcionó un teléfono)
      if (formData.phone && formData.phone.trim()) {
        const { data: existingPhones, error: phoneCheckError } = await supabase
          .from('profiles')
          .select('email, phone')
          .eq('phone', formData.phone.trim())
        
        if (phoneCheckError) {
          console.error('❌ Error checking existing phone:', phoneCheckError)
          setError('Error al verificar el teléfono. Por favor intenta nuevamente.')
          return
        }
        
        if (existingPhones && existingPhones.length > 0) {
          console.log('❌ Phone already exists:', existingPhones[0])
          setError(`Este número de teléfono (${formData.phone}) ya está registrado en el sistema. Por favor usa un número diferente.`)
          return
        }
      }

      console.log('✅ Email and phone are available for registration')

      console.log('🔐 Creating auth user...')
      // Intentar registrar con teléfono, pero si falla por duplicado, registrar sin teléfono en campo principal
      const signUpData: {
        email: string;
        password: string;
        phone?: string;
        options: {
          emailRedirectTo: string;
          data: {
            confirm: boolean;
            full_name: string;
            phone: string;
          };
        };
      } = {
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            confirm: false,
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      }

      // Agregar teléfono al campo principal solo si no está vacío
      if (formData.phone && formData.phone.trim()) {
        signUpData.phone = formData.phone
      }

      const { data: authData, error: authError } = await supabase.auth.signUp(signUpData)

      if (authError) {
        console.error('❌ Auth creation error:', authError)
        
        // Si el error es por teléfono duplicado, mostrar mensaje específico
        if (authError.message.includes('duplicate key value violates unique constraint "users_phone_key"')) {
          setError(`Este número de teléfono (${formData.phone}) ya está registrado en el sistema. Por favor usa un número diferente.`)
          return
        } else if (authError.message.includes('User already registered')) {
          setError('Este email ya está registrado. Intenta con otro email o inicia sesión.')
          return
        } else {
          setError('Error al crear usuario: ' + authError.message)
          return
        }
      }

      if (!authData.user) {
        setError('No se pudo crear el usuario')
        return
      }

      console.log('✅ Auth user created:', authData.user.id)

      // Esperar un momento para que la sesión se establezca completamente
      await new Promise(resolve => setTimeout(resolve, 500))

      let companyId = formData.companyId
      if (isCreatingNewCompany && formData.companyName) {
        console.log('🏢 Creating new company...')
        
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .insert([{
            name: formData.companyName,
            email: formData.email
          }])
          .select()
          .single()

        if (companyError) {
          console.error('❌ Company creation error:', companyError)
          setError('Error al crear la empresa: ' + companyError.message)
          return
        }

        companyId = companyData.id.toString()
        console.log('✅ Company created:', companyId)
      }

      console.log('👤 Creating/updating user profile...')
      
      // Obtener el nombre de la empresa
      let companyName = null
      if (companyId) {
        if (isCreatingNewCompany) {
          companyName = formData.companyName
        } else {
          const selectedCompany = companies.find(c => c.id.toString() === companyId)
          companyName = selectedCompany?.name || null
        }
      }
      
      // Actualizar el perfil creado automáticamente por el trigger
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
          role: formData.role,
          language: formData.language,
          company_id: companyId ? parseInt(companyId) : null,
          company_name: companyName
        })
        .eq('auth_id', authData.user!.id)
        .select()
        .single()

      if (profileError) {
        console.error('❌ Profile creation error:', profileError)
        setError('Error al crear el perfil: ' + profileError.message)
        return
      }

      console.log('✅ Profile created:', profileData.id)

      // Asignar certificaciones al usuario si hay certificaciones seleccionadas
      if (selectedCertifications.length > 0) {
        console.log('🎓 Assigning certifications...', selectedCertifications)
        
        // Primero insertar certificaciones sin archivos
        const certificationAssignments = selectedCertifications.map(certificationId => ({
          user_id: profileData.id,
          certification_id: certificationId
        }))

        const { error: certificationsError } = await supabase
          .from('user_certifications')
          .insert(certificationAssignments)

        if (certificationsError) {
          console.error('❌ Error assigning certifications:', certificationsError)
        } else {
          console.log('✅ Certifications assigned')
        }
      }

      console.log('🏢 Assigning markets...')
      const marketAssignments = selectedMarkets.map(marketId => ({
        user_id: profileData.id,
        market_id: marketId
      }))

      const { error: marketError } = await supabase
        .from('user_markets')
        .insert(marketAssignments)

      if (marketError) {
        console.error('❌ Market assignment error:', marketError)
        setError('Error al asignar mercados: ' + marketError.message)
        return
      }

      console.log('✅ Markets assigned')

      // Iniciar sesión automáticamente después del registro exitoso
      try {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        })

        if (loginError) {
          console.error('❌ Auto-login error:', loginError)
          alert(`Usuario creado exitosamente, pero hubo un error al iniciar sesión automáticamente. Por favor inicia sesión manualmente.`)
          router.push('https://app.logbid.co/auth')
          return
        }

        if (!loginData?.user) {
          alert(`Usuario creado exitosamente, pero no se pudo obtener la información del usuario. Por favor inicia sesión manualmente.`)
          router.push('https://app.logbid.co/auth')
          return
        }

        console.log('✅ User logged in successfully')
        
        // Subir archivos PDF después de estar autenticado
        if (selectedCertifications.length > 0 && Object.keys(certificationFiles).length > 0) {
          console.log('📄 Uploading certification PDFs after authentication...')
          
          for (const certificationId of selectedCertifications) {
            const file = certificationFiles[certificationId]
            
            if (file) {
              console.log(`📄 Uploading PDF for certification ${certificationId}...`)
              const fileExtension = file.name.split('.').pop()
              const uniqueFileName = `${profileData.id}/${certificationId}_${Date.now()}.${fileExtension}`
              
              const { data: uploadData, error: uploadError } = await supabase.storage
                .from('certifications')
                .upload(uniqueFileName, file, {
                  cacheControl: '3600',
                  upsert: false
                })
              
              if (uploadError) {
                console.error(`❌ Error uploading PDF for certification ${certificationId}:`, uploadError)
              } else {
                // Actualizar el registro de certificación con la información del archivo
                const { error: updateError } = await supabase
                  .from('user_certifications')
                  .update({
                    pdf_file_name: file.name,
                    pdf_file_path: uploadData.path,
                    pdf_file_size: file.size,
                    pdf_uploaded_at: new Date().toISOString()
                  })
                  .eq('user_id', profileData.id)
                  .eq('certification_id', certificationId)
                
                if (updateError) {
                  console.error(`❌ Error updating certification record:`, updateError)
                } else {
                  console.log(`✅ PDF uploaded and record updated for certification ${certificationId}`)
                }
              }
            }
          }
        }

        // Subir documentos legales después de estar autenticado
        if (Object.keys(legalDocumentFiles).length > 0) {
          console.log('📋 Uploading legal documents after authentication...')
          
          for (const [documentType, file] of Object.entries(legalDocumentFiles)) {
            if (file) {
              console.log(`📋 Uploading ${documentType} document...`)
              const fileExtension = file.name.split('.').pop()
              const uniqueFileName = `${profileData.id}/${documentType}_${Date.now()}.${fileExtension}`
              
              const { data: uploadData, error: uploadError } = await supabase.storage
                .from('legal-documents')
                .upload(uniqueFileName, file, {
                  cacheControl: '3600',
                  upsert: false
                })
              
              if (uploadError) {
                console.error(`❌ Error uploading ${documentType} document:`, uploadError)
              } else {
                // Insertar o actualizar el registro del documento legal
                const { error: insertError } = await supabase
                  .from('legal_documents_agent')
                  .upsert({
                    user_id: profileData.id,
                    document_type: documentType,
                    rut_number: documentType === 'rut' ? formData.rut : null,
                    file_name: file.name,
                    file_path: uploadData.path,
                    file_size: file.size,
                    uploaded_at: new Date().toISOString()
                  }, {
                    onConflict: 'user_id,document_type'
                  })
                
                if (insertError) {
                  console.error(`❌ Error saving ${documentType} document record:`, insertError)
                } else {
                  console.log(`✅ ${documentType} document uploaded and saved successfully`)
                }
              }
            }
          }
        }
        
        // Enviar email de bienvenida
        try {
          const companyName = isCreatingNewCompany 
            ? formData.companyName 
            : companies.find(c => c.id.toString() === formData.companyId)?.name

          await sendWelcomeEmail({
            email: formData.email,
            full_name: formData.fullName,
            role: formData.role,
            language: formData.language,
            company_name: companyName
          })
        } catch (emailError) {
          console.error('⚠️ Welcome email error (registration still successful):', emailError)
        }
        
        alert(`¡Bienvenido! Tu cuenta ha sido creada exitosamente.`)
        router.push('https://app.logbid.co/auth')
      } catch (autoLoginError) {
        console.error('💥 Auto-login catch error:', autoLoginError)
        alert(`Usuario creado exitosamente, pero hubo un error inesperado al iniciar sesión automáticamente. Por favor inicia sesión manualmente.`)
        router.push('https://app.logbid.co/auth')
        return
      }

    } catch (err) {
      console.error('💥 Unexpected error:', err)
      setError('Error inesperado durante el registro')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-black text-slate-900">LogBid</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/servicios" className="text-slate-700 hover:text-blue-800 font-medium transition-colors duration-200">
                {t('nav.services')}
              </Link>
              <Link href="/como-funciona" className="text-slate-700 hover:text-blue-800 font-medium transition-colors duration-200">
                {t('nav.howItWorks')}
              </Link>
              <Link href="/precios" className="text-slate-700 hover:text-blue-800 font-medium transition-colors duration-200">
                {t('nav.pricing')}
              </Link>
              <Link href="/soporte" className="text-slate-700 hover:text-blue-800 font-medium transition-colors duration-200">
                {t('nav.support')}
              </Link>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <Button className="bg-blue-800 hover:bg-blue-900 px-6 py-2 rounded-md text-white font-medium" onClick={() => window.location.href = 'https://app.logbid.co/auth'}>
                  {t('nav.login')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Home */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* Hero Section with Split Layout */}
      <div className="relative z-10 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Value Proposition */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-[#1e3a8a]/10 text-[#1e3a8a] rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  {t('hero.platformNumberOne')}
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t('hero.yourBusinessFlow')}
                  <span className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] bg-clip-text text-transparent"> {t('hero.asAgent')}</span>
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('hero.discoverHowLogBidAgent')}
                </p>

                {/* Business Flow Process */}
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6 text-center">{t('businessFlowAgent.title')}</h3>
                  
                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                          <span className="font-bold text-white">1</span>
                        </div>
                        <div className="absolute top-10 left-1/2 w-0.5 h-6 bg-white/30 transform -translate-x-1/2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-5 h-5 text-yellow-300" />
                          <h4 className="font-semibold">{t('businessFlowAgent.step1Title')}</h4>
                        </div>
                        <p className="text-blue-100 text-sm">
                          {t('businessFlowAgent.step1Description')}
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                          <span className="font-bold text-white">2</span>
                        </div>
                        <div className="absolute top-10 left-1/2 w-0.5 h-6 bg-white/30 transform -translate-x-1/2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-5 h-5 text-green-300" />
                          <h4 className="font-semibold">{t('businessFlowAgent.step2Title')}</h4>
                        </div>
                        <p className="text-blue-100 text-sm">
                          {t('businessFlowAgent.step2Description')}
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                          <span className="font-bold text-white">3</span>
                        </div>
                        <div className="absolute top-10 left-1/2 w-0.5 h-6 bg-white/30 transform -translate-x-1/2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-purple-300" />
                          <h4 className="font-semibold">{t('businessFlowAgent.step3Title')}</h4>
                        </div>
                        <p className="text-blue-100 text-sm">
                          {t('businessFlowAgent.step3Description')}
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-start space-x-4">
                      <div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                          <span className="font-bold text-white">4</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="w-5 h-5 text-yellow-300" />
                          <h4 className="font-semibold">{t('businessFlowAgent.step4Title')}</h4>
                        </div>
                        <p className="text-blue-100 text-sm">
                          {t('businessFlowAgent.step4Description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefitsAgent.revenue')}</h3>
                  <p className="text-sm text-gray-600">{t('benefitsAgent.revenueDescription')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefitsAgent.time')}</h3>
                  <p className="text-sm text-gray-600">{t('benefitsAgent.timeDescription')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefitsAgent.importers')}</h3>
                  <p className="text-sm text-gray-600">{t('benefitsAgent.importersDescription')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefitsAgent.reputation')}</h3>
                  <p className="text-sm text-gray-600">{t('benefitsAgent.reputationDescription')}</p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-lg">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('testimonialAgent.name')}</h4>
                    <p className="text-blue-200 text-sm">{t('testimonialAgent.position')}</p>
                  </div>
                </div>
                <p className="text-blue-100 italic">
                  &quot;{t('testimonialAgent.quote')}&quot;
                </p>
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:pl-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative">
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t('register.startRegistration')}
                    </h3>
                    <p className="text-gray-600">
                      {t('register.joinAgents')}
                    </p>
                  </div>

                  {/* Step Indicator - Large Numbers */}
                  <div className="mb-8 text-center">
                    <div className="flex justify-center items-center space-x-16">
                      {/* Step 1 */}
                      <div className="text-center">
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-3 transition-all duration-300 ${
                          currentStep === 1 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : currentStep > 1
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {currentStep > 1 ? '✓' : '1'}
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-500 mb-1">{t('register.step')} 1</p>
                          <p className={`text-sm font-semibold ${currentStep === 1 ? 'text-blue-600' : currentStep > 1 ? 'text-green-600' : 'text-gray-500'}`}>
                            {t('form.personalInfo')}
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="text-center">
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-3 transition-all duration-300 ${
                          currentStep === 2 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          2
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-500 mb-1">{t('register.step')} 2</p>
                          <p className={`text-sm font-semibold ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                            {t('register.documents')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>


                  <form onSubmit={handleRegister} className="space-y-5">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      {/* Personal Info in Grid */}
                      <div className="space-y-3">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center">
                      <UserPlus className="w-4 h-4 mr-2 text-[#1e3a8a]" />
                      {t('form.personalInfo')}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="fullName" className="text-xs font-medium text-gray-700 block mb-1">
                          {t('form.name')}
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder={t('form.namePlaceholder').toString()}
                          required
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="h-10 border border-gray-300 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-xs font-medium text-gray-700 block mb-1">
                          {t('form.email')}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('form.emailPlaceholder').toString()}
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="h-10 border border-gray-300 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-xs font-medium text-gray-700 block mb-1">
                          {t('form.phone')}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t('form.phonePlaceholder').toString()}
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-10 border border-gray-300 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-sm"
                        />
                      </div>

                      <div>
                        <Label className="text-xs font-medium text-gray-700 block mb-1">
                          {t('form.language')}
                        </Label>
                        <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                          <SelectTrigger className="h-10 border border-gray-300 focus:border-[#1e3a8a] text-sm">
                            <SelectValue placeholder={t('form.language').toString()} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">🇪🇸 {t('form.spanish')}</SelectItem>
                            <SelectItem value="en">🇺🇸 {t('form.english')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Security in Grid */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-green-600" />
                      {t('form.credentials')}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="password" className="text-xs font-medium text-gray-700 block mb-1">
                          {t('form.password')}
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder={t('form.passwordPlaceholder').toString()}
                          required
                          autoComplete="new-password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="h-10 border border-gray-300 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="text-xs font-medium text-gray-700 block mb-1">
                          {t('form.confirmPassword')}
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder={t('form.confirmPasswordPlaceholder').toString()}
                          required
                          autoComplete="new-password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="h-10 border border-gray-300 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Section */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-purple-600" />
                      {t('form.company')}
                    </h3>
                    
                    <div className="bg-gray-50 rounded-lg p-3 border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id="new-company-checkbox"
                          checked={isCreatingNewCompany}
                          onCheckedChange={(checked) => setIsCreatingNewCompany(checked === true)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="new-company-checkbox" className="text-sm text-gray-700">
                          {t('form.createNewCompany')}
                        </Label>
                      </div>

                      {isCreatingNewCompany ? (
                        <div>
                          <Label htmlFor="companyName" className="text-xs font-medium text-gray-700 block mb-1">
                            {t('form.companyName')}
                          </Label>
                          <Input
                            id="companyName"
                            type="text"
                            placeholder={t('form.companyNamePlaceholder').toString()}
                            required={isCreatingNewCompany}
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className="h-10 border border-gray-300 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-sm"
                          />
                        </div>
                      ) : (
                        <div>
                          <Label className="text-xs font-medium text-gray-700 block mb-1">
                            {t('form.existingCompany')}
                          </Label>
                          <Select value={formData.companyId} onValueChange={(value) => handleInputChange('companyId', value)}>
                            <SelectTrigger className="h-10 border border-gray-300 focus:border-[#1e3a8a] text-sm">
                              <SelectValue placeholder={t('form.selectCompany')} />
                            </SelectTrigger>
                            <SelectContent>
                              {companies.map((company) => (
                                <SelectItem key={company.id} value={company.id.toString()}>
                                  {company.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Markets Section */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-orange-600" />
                      {t('form.markets')}
                    </h3>
                    
                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                      <p className="text-xs text-orange-700 mb-2">
                        {t('form.marketsAgentDescription')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {markets.map((market) => (
                          <div key={market.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`market-checkbox-${market.id}`}
                              checked={selectedMarkets.includes(market.id)}
                              onCheckedChange={(checked) => {
                                if (checked === true) {
                                  handleMarketToggle(market.id)
                                } else {
                                  handleMarketToggle(market.id)
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <Label htmlFor={`market-checkbox-${market.id}`} className="text-xs text-gray-700">
                              {market.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                      {/* Step 1 Navigation */}
                      <div className="flex justify-end mt-6">
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                        >
                          {t('register.nextDocuments')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Documents */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      {/* Legal Documents Section */}
                      <div className="space-y-3">
                        <h3 className="text-base font-semibold text-gray-800 flex items-center">
                          <FileCheck className="w-4 h-4 mr-2 text-blue-600" />
                          {t('register.legalDocuments')}
                        </h3>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-xs text-blue-700 mb-3">
                            {t('register.legalDocumentsDescription')}
                          </p>
                          <div className="space-y-4">
                            
                            {/* RUT - Campo + PDF */}
                            <div className="bg-white rounded-lg p-3 border border-blue-300">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('register.rut')} *</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <Label htmlFor="rut" className="text-xs font-medium text-gray-700 block mb-1">
                                    {t('register.rutNumber')} *
                                  </Label>
                                  <Input
                                    id="rut"
                                    type="text"
                                    placeholder={t('register.rutPlaceholder').toString()}
                                    value={formData.rut}
                                    onChange={(e) => handleInputChange('rut', e.target.value)}
                                    className="h-10 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="rutPdf" className="text-xs font-medium text-gray-700 block mb-1">
                                    {t('register.rutDocument')} *
                                  </Label>
                                  <input
                                    id="rutPdf"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null
                                      if (file && file.size > 10 * 1024 * 1024) {
                                        alert('El archivo no puede ser mayor a 10MB')
                                        e.target.value = ''
                                        return
                                      }
                                      handleLegalDocumentFileChange('rut', file)
                                    }}
                                    className="block w-full text-sm text-gray-500 
                                             file:mr-4 file:py-2 file:px-4
                                             file:rounded-md file:border-0
                                             file:text-sm file:font-medium
                                             file:bg-blue-50 file:text-blue-700
                                             hover:file:bg-blue-100
                                             file:cursor-pointer cursor-pointer"
                                  />
                                  {legalDocumentFiles['rut'] && (
                                    <p className="text-xs text-blue-600 mt-1">
                                      ✓ {legalDocumentFiles['rut']?.name}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Cámara de Comercio - Solo PDF */}
                            <div className="bg-white rounded-lg p-3 border border-blue-300">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('register.chamberOfCommerce')} *</h4>
                              <div>
                                <Label htmlFor="camaraComercio" className="text-xs font-medium text-gray-700 block mb-1">
                                  {t('register.chamberOfCommerceDocument')} *
                                </Label>
                                <input
                                  id="camaraComercio"
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null
                                    if (file && file.size > 10 * 1024 * 1024) {
                                      alert('El archivo no puede ser mayor a 10MB')
                                      e.target.value = ''
                                      return
                                    }
                                    handleLegalDocumentFileChange('camaraComercio', file)
                                  }}
                                  className="block w-full text-sm text-gray-500 
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-md file:border-0
                                           file:text-sm file:font-medium
                                           file:bg-blue-50 file:text-blue-700
                                           hover:file:bg-blue-100
                                           file:cursor-pointer cursor-pointer"
                                />
                                {legalDocumentFiles['camaraComercio'] && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    ✓ {legalDocumentFiles['camaraComercio']?.name}
                                  </p>
                                )}
                                <p className="text-xs text-blue-600 mt-1">
                                  {t('register.chamberOfCommerceValidation')}
                                </p>
                              </div>
                            </div>

                            {/* Cédula Representante Legal - Solo PDF */}
                            <div className="bg-white rounded-lg p-3 border border-blue-300">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('register.legalRepresentative')} *</h4>
                              <div>
                                <Label htmlFor="cedulaRepresentante" className="text-xs font-medium text-gray-700 block mb-1">
                                  {t('register.legalRepresentativeDocument')} *
                                </Label>
                                <input
                                  id="cedulaRepresentante"
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null
                                    if (file && file.size > 10 * 1024 * 1024) {
                                      alert('El archivo no puede ser mayor a 10MB')
                                      e.target.value = ''
                                      return
                                    }
                                    handleLegalDocumentFileChange('cedulaRepresentante', file)
                                  }}
                                  className="block w-full text-sm text-gray-500 
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-md file:border-0
                                           file:text-sm file:font-medium
                                           file:bg-blue-50 file:text-blue-700
                                           hover:file:bg-blue-100
                                           file:cursor-pointer cursor-pointer"
                                />
                                {legalDocumentFiles['cedulaRepresentante'] && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    ✓ {legalDocumentFiles['cedulaRepresentante']?.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Certifications Section */}
                      <div className="space-y-3">
                        <h3 className="text-base font-semibold text-gray-800 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                          {t('register.certificationsTitle')}
                        </h3>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-xs text-blue-700 mb-2">
                            {t('register.certificationsDescription')}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {certifications.map((certification) => (
                              <div key={certification.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`cert-checkbox-${certification.id}`}
                                  checked={selectedCertifications.includes(certification.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked === true) {
                                      handleCertificationToggle(certification.id)
                                    } else {
                                      handleCertificationToggle(certification.id)
                                    }
                                  }}
                                  className="w-4 h-4"
                                />
                                <Label htmlFor={`cert-checkbox-${certification.id}`} className="text-xs text-gray-700">
                                  {certification.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* PDF Upload Section for Certifications */}
                      {selectedCertifications.length > 0 && !selectedCertifications.includes(certifications.find(cert => cert.name === "Ninguna")?.id || 9) && (
                        <div className="space-y-3">
                          <h3 className="text-base font-semibold text-gray-800 flex items-center">
                            <Package className="w-4 h-4 mr-2 text-blue-600" />
                            {t('register.certificationDocumentsTitle')}
                          </h3>
                          
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <p className="text-xs text-blue-700 mb-3">
                              {t('register.certificationDocumentsDescription')}
                            </p>
                            <div className="space-y-3">
                              {selectedCertifications.map(certId => {
                                const certification = certifications.find(c => c.id === certId)
                                if (!certification || certification.name === "Ninguna") return null
                                
                                return (
                                  <div key={certId} className="bg-white rounded-lg p-3 border border-blue-300">
                                    <Label htmlFor={`pdf-${certId}`} className="text-sm font-medium text-gray-700 block mb-2">
                                      {certification.name}
                                    </Label>
                                    <input
                                      id={`pdf-${certId}`}
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0] || null
                                        if (file && file.size > 10 * 1024 * 1024) {
                                          alert('El archivo no puede ser mayor a 10MB')
                                          e.target.value = ''
                                          return
                                        }
                                        handleFileChange(certId, file)
                                      }}
                                      className="block w-full text-sm text-gray-500 
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-md file:border-0
                                               file:text-sm file:font-medium
                                               file:bg-blue-50 file:text-blue-700
                                               hover:file:bg-blue-100
                                               file:cursor-pointer cursor-pointer"
                                    />
                                    {certificationFiles[certId] && (
                                      <p className="text-xs text-blue-600 mt-2">
                                        ✓ {certificationFiles[certId]?.name}
                                      </p>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hidden role field */}
                      <input type="hidden" value={formData.role} />

                      {/* Step 2 Navigation */}
                      <div className="flex justify-between mt-6">
                        <Button
                          type="button"
                          onClick={handlePreviousStep}
                          variant="outline"
                          className="border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium"
                        >
                          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                          {t('register.previous')}
                        </Button>

                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb] text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl"
                          disabled={isLoading}
                        >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Package className="w-4 h-4 animate-spin" />
                        <span>{t('register.creatingAccount')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{t('register.createAgentAccount')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                        </Button>
                      </div>
                    </div>
                  )}
                  </form>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg mt-4">
                      <p className="text-red-700 text-xs text-center font-medium">
                        {error}
                      </p>
                    </div>
                  )}

                  <div className="text-center pt-4">
                    <Link
                      href="https://app.logbid.co/auth"
                      className="text-xs text-[#1e3a8a] hover:text-[#1e40af] font-medium transition-colors"
                      prefetch={false}
                    >
                      {t('register.alreadyHaveAccount')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
