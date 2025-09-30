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
import { useSendWelcomeEmail } from '@/hooks/useSendWelcomeEmail'
import { useTranslation } from '@/hooks/useTranslation'
import { createSupabaseClient } from '@/utils/supabase/client'
import {
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileCheck,
  Globe,
  Lock,
  Package,
  ShieldCheck,
  Star,
  Truck,
  UserPlus,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
}

export default function RegisterImporterPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [markets, setMarkets] = useState<Market[]>([])
  const [selectedMarkets, setSelectedMarkets] = useState<number[]>([])
  const [isCreatingNewCompany, setIsCreatingNewCompany] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [clientDocumentFiles, setClientDocumentFiles] = useState<{[key: string]: File | null}>({})
  const { sendWelcomeEmail } = useSendWelcomeEmail()

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer', // Fixed role for importer registration
    language: 'es',
    companyName: '',
    companyId: '',
    rut: '',
  })

  useEffect(() => {
    const loadData = async () => {
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
      
      if (companiesData) {
        setCompanies(companiesData)
        console.log('✅ Companies loaded:', companiesData.length)
      } else {
        console.error('❌ No companies data:', companiesError)
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

  const handleClientDocumentFileChange = (documentType: string, file: File | null) => {
    setClientDocumentFiles(prev => ({
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
    if (!clientDocumentFiles['rut']) {
      setError('El documento RUT es requerido')
      return false
    }

    // Validar Cámara de Comercio
    if (!clientDocumentFiles['camaraComercio']) {
      setError('El certificado de Cámara de Comercio es requerido')
      return false
    }

    // Validar Cédula Representante Legal
    if (!clientDocumentFiles['cedulaRepresentante']) {
      setError('La cédula del representante legal es requerida')
      return false
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
      const { data: existingProfiles, error: checkError } = await supabase
        .from('profiles')
        .select('email, created_at')
        .eq('email', formData.email)

      console.log('Email check result:', { 
        existingProfiles, 
        checkError, 
        count: existingProfiles?.length || 0 
      })

      if (checkError) {
        setError('Error al verificar el email. Por favor intenta nuevamente.')
        return
      } 
      
      if (existingProfiles && existingProfiles.length > 0) {
        setError(`Este email ya está registrado (desde ${existingProfiles[0].created_at}). Por favor usa un email diferente.`)
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
          // Deshabilitar email de confirmación para testing
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
        // Si el error es por teléfono duplicado, mostrar mensaje específico
        if (authError.message.includes('duplicate key value violates unique constraint "users_phone_key"')) {
          setError(`Este número de teléfono (${formData.phone}) ya está registrado en el sistema. Por favor usa un número diferente.`)
          return
        } else if (authError.message.includes('User already registered')) {
          setError('Este email ya está registrado. Intenta con otro email o inicia sesión.')
          return
        } else if (authError.code === 'over_email_send_rate_limit') {
          setError('Límite de emails alcanzado. Por favor espera unos minutos antes de registrarte nuevamente.')
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

      // Esperar un momento para que la sesión se establezca completamente
      await new Promise(resolve => setTimeout(resolve, 500))

      let companyId = formData.companyId
      if (isCreatingNewCompany && formData.companyName) {
        
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .insert([{
            name: formData.companyName,
            email: formData.email
          }])
          .select()
          .single()

        if (companyError) {
          setError('Error al crear la empresa: ' + companyError.message)
          return
        }

        companyId = companyData.id.toString()
      }

      
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
        if (profileError.message.includes('duplicate key value violates unique constraint "profiles_email_key"')) {
          setError('Este email ya está registrado en el sistema. Por favor usa un email diferente.')
        } else {
          setError('Error al crear el perfil: ' + profileError.message)
        }
        return
      }

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
          alert(`Usuario creado exitosamente, pero hubo un error al iniciar sesión automáticamente: ${loginError.message}. Por favor inicia sesión manualmente.`)
          router.push('/auth')
          return
        }

        if (!loginData?.user) {
          alert(`Usuario creado exitosamente, pero no se pudo obtener la información del usuario. Por favor inicia sesión manualmente.`)
          router.push('/auth')
          return
        }

        // Note: Profile loading would happen here if auth store exists
        console.log('✅ User logged in successfully')
        
        // Pequeña pausa para asegurar que todo se establezca
        await new Promise(resolve => setTimeout(resolve, 500))

        // Upload client documents if any were selected
        console.log('📤 Uploading client documents...')
        const documentsToUpload = Object.entries(clientDocumentFiles).filter(([, file]) => file !== null)
        
        if (documentsToUpload.length > 0) {
          try {
            for (const [documentType, file] of documentsToUpload) {
              if (!file) continue
              
              const fileExt = file.name.split('.').pop()
              const fileName = `${profileData.id}_${documentType}_${Date.now()}.${fileExt}`
              const filePath = `${profileData.id}/${fileName}`

              console.log(`📤 Uploading ${documentType}:`, fileName)

              const { data: uploadData, error: uploadError } = await supabase.storage
                .from('client-documents')
                .upload(filePath, file)

              if (uploadError) {
                console.error(`❌ Error uploading ${documentType}:`, uploadError)
                // Don't halt registration for upload errors, just log them
                continue
              }

              console.log(`✅ ${documentType} uploaded successfully:`, uploadData)

              // Save document metadata to legal_documents_customer table
              const documentData: {
                user_id: string;
                document_type: string;
                file_name: string;
                file_path: string;
                file_size: number;
                uploaded_at: string;
                rut_number?: string;
              } = {
                user_id: profileData.id,
                document_type: documentType,
                file_name: fileName,
                file_path: filePath,
                file_size: file.size,
                uploaded_at: new Date().toISOString()
              }

              // Add RUT number if it's a RUT document
              if (documentType === 'rut' && formData.rut) {
                documentData.rut_number = formData.rut
              }

              const { error: docError } = await supabase
                .from('legal_documents_customer')
                .upsert(documentData)

              if (docError) {
                console.error(`❌ Error saving ${documentType} metadata:`, docError)
              } else {
                console.log(`✅ ${documentType} metadata saved`)
              }
            }
            console.log('✅ All client documents processed')
          } catch (uploadError) {
            console.error('⚠️ Error in document upload process (registration still successful):', uploadError)
          }
        }
        
        // Enviar email de bienvenida
        console.log('🎯 Iniciando proceso de envío de email de bienvenida...')
        try {
          const companyName = isCreatingNewCompany 
            ? formData.companyName 
            : companies.find(c => c.id.toString() === formData.companyId)?.name

          const emailResult = await sendWelcomeEmail({
            email: formData.email,
            full_name: formData.fullName,
            role: formData.role,
            language: formData.language,
            company_name: companyName
          })

          console.log('✅ Email result:', emailResult)
        } catch (emailError) {
          // El error ya se maneja en el hook, solo logueamos aquí
          console.error('⚠️ Welcome email error (registration still successful):', emailError)
        }
        
        alert(`¡Bienvenido! Tu cuenta ha sido creada exitosamente. ${formData.email ? 'Revisa tu email para más información.' : ''}`)
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/auth`)
      } catch (autoLoginError) {
        console.error('💥 Auto-login catch error:', autoLoginError)
        alert(`Usuario creado exitosamente, pero hubo un error inesperado al iniciar sesión automáticamente. Por favor inicia sesión manualmente.`)
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/auth`)
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
                  <span className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] bg-clip-text text-transparent"> {t('hero.asImporter')}</span>
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('hero.discoverHowLogBid')}
                </p>

                {/* Business Flow Process */}
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6 text-center">{t('businessFlow.importerTitle')}</h3>
                  
                  <div className="space-y-4">
                    {/* Phase 1 */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                        <span className="font-bold text-white text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Package className="w-4 h-4 text-green-300" />
                          <h4 className="font-semibold text-sm">{t('businessFlow.creation')}</h4>
                        </div>
                        <p className="text-blue-100 text-xs">
                          {t('businessFlow.creationDescription')}
                        </p>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                        <span className="font-bold text-white text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calculator className="w-4 h-4 text-yellow-300" />
                          <h4 className="font-semibold text-sm">{t('businessFlow.quotations')}</h4>
                        </div>
                        <p className="text-blue-100 text-xs">
                          {t('businessFlow.quotationsDescription')}
                        </p>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                        <span className="font-bold text-white text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <BarChart3 className="w-4 h-4 text-purple-300" />
                          <h4 className="font-semibold text-sm">{t('businessFlow.evaluation')}</h4>
                        </div>
                        <p className="text-blue-100 text-xs">
                          {t('businessFlow.evaluationDescription')}
                        </p>
                      </div>
                    </div>

                    {/* Phase 4 */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                        <span className="font-bold text-white text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <ShieldCheck className="w-4 h-4 text-cyan-300" />
                          <h4 className="font-semibold text-sm">{t('businessFlow.confirmation')}</h4>
                        </div>
                        <p className="text-blue-100 text-xs">
                          {t('businessFlow.confirmationDescription')}
                        </p>
                      </div>
                    </div>

                    {/* Phase 5 */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                        <span className="font-bold text-white text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Truck className="w-4 h-4 text-orange-300" />
                          <h4 className="font-semibold text-sm">{t('businessFlow.execution')}</h4>
                        </div>
                        <p className="text-blue-100 text-xs">
                          {t('businessFlow.executionDescription')}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-3 mt-4">
                      <div className="flex items-center justify-center space-x-6 text-center">
                        <div>
                          <div className="text-xl font-bold text-white">10-50</div>
                          <div className="text-xs text-blue-200">{t('businessFlow.totalDays')}</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-green-300">10-30%</div>
                          <div className="text-xs text-blue-200">{t('businessFlow.savings')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.savings')}</h3>
                  <p className="text-sm text-gray-600">{t('benefits.savingsDescription')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.transparency')}</h3>
                  <p className="text-sm text-gray-600">{t('benefits.transparencyDescription')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.agents')}</h3>
                  <p className="text-sm text-gray-600">{t('benefits.agentsDescription')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.realTime')}</h3>
                  <p className="text-sm text-gray-600">{t('benefits.realTimeDescription')}</p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('testimonial.name')}</h4>
                    <p className="text-blue-200 text-sm">{t('testimonial.position')}</p>
                  </div>
                </div>
                <p className="text-blue-100 italic">
                  &quot;{t('testimonial.quote')}&quot;
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
                      {t('register.joinImporters')}
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
                            {t('register.personalInfo')}
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
                            <SelectValue placeholder="Idioma" />
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
                        {t('form.marketsDescription')}
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
                      {/* Client Documents Section */}
                      <div className="space-y-3">
                        <h3 className="text-base font-semibold text-gray-800 flex items-center">
                          <FileCheck className="w-4 h-4 mr-2 text-blue-600" />
                          {t('register.importerDocuments')} *
                        </h3>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-xs text-blue-700 mb-3">
                            {t('register.requiredDocuments')}
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
                                      handleClientDocumentFileChange('rut', file)
                                    }}
                                    className="block w-full text-sm text-gray-500 
                                             file:mr-4 file:py-2 file:px-4
                                             file:rounded-md file:border-0
                                             file:text-sm file:font-medium
                                             file:bg-blue-50 file:text-blue-700
                                             hover:file:bg-blue-100
                                             file:cursor-pointer cursor-pointer"
                                  />
                                  {clientDocumentFiles['rut'] && (
                                    <p className="text-xs text-blue-600 mt-1">
                                      ✓ {clientDocumentFiles['rut']?.name}
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
                                    handleClientDocumentFileChange('camaraComercio', file)
                                  }}
                                  className="block w-full text-sm text-gray-500 
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-md file:border-0
                                           file:text-sm file:font-medium
                                           file:bg-blue-50 file:text-blue-700
                                           hover:file:bg-blue-100
                                           file:cursor-pointer cursor-pointer"
                                />
                                {clientDocumentFiles['camaraComercio'] && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    ✓ {clientDocumentFiles['camaraComercio']?.name}
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
                                    handleClientDocumentFileChange('cedulaRepresentante', file)
                                  }}
                                  className="block w-full text-sm text-gray-500 
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-md file:border-0
                                           file:text-sm file:font-medium
                                           file:bg-blue-50 file:text-blue-700
                                           hover:file:bg-blue-100
                                           file:cursor-pointer cursor-pointer"
                                />
                                {clientDocumentFiles['cedulaRepresentante'] && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    ✓ {clientDocumentFiles['cedulaRepresentante']?.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

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
                        <span>{t('register.createImporterAccount')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-xs text-center font-medium">
                        {error}
                      </p>
                    </div>
                  )}

                  <div className="text-center pt-2">
                    <Link
                      href="https://app.logbid.co/auth"
                      className="text-xs text-[#1e3a8a] hover:text-[#1e40af] font-medium transition-colors"
                      prefetch={false}
                    >
                      {t('register.alreadyHaveAccount')}
                    </Link>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
