'use client'
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Users
} from 'lucide-react';
import Link from 'next/link';

const SoportePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
              <Link href="/soporte" className="text-blue-800 font-medium">
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

      {/* Header Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('support.title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('support.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('support.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('support.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: t('support.liveChat.title'),
                description: t('support.liveChat.description'),
                availability: t('support.liveChat.availability'),
                responseTime: "Respuesta inmediata",
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
                borderColor: "border-blue-200",
                buttonColor: "bg-blue-600 hover:bg-blue-700"
              },
              {
                icon: Phone,
                title: t('support.phoneSupport.title'),
                description: t('support.phoneSupport.description'),
                availability: t('support.phoneSupport.availability'),
                responseTime: "Atención inmediata",
                bgColor: "bg-green-50",
                iconColor: "text-green-600",
                borderColor: "border-green-200",
                buttonColor: "bg-green-600 hover:bg-green-700"
              },
              {
                icon: Mail,
                title: t('support.emailSupport.title'),
                description: t('support.emailSupport.description'),
                availability: t('support.emailSupport.availability'),
                responseTime: "< 2 horas",
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600",
                borderColor: "border-purple-200",
                buttonColor: "bg-purple-600 hover:bg-purple-700"
              }
            ].map((support, index) => {
              const IconComponent = support.icon;
              return (
                <Card key={index} className={`border-2 ${support.borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300 ${support.bgColor}`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${support.bgColor} rounded-lg flex items-center justify-center mb-6 mx-auto border-2 ${support.borderColor}`}>
                      <IconComponent className={`w-8 h-8 ${support.iconColor}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{support.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{support.description}</p>
                    
                    <div className="space-y-2 mb-8">
                      <div className="flex items-center justify-center text-slate-700">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{support.availability}</span>
                      </div>
                      <div className="text-sm text-slate-500">
                        {support.responseTime}
                      </div>
                    </div>
                    
                    <Button className={`w-full ${support.buttonColor} text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-md`}>
                      Contactar Ahora
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Self-Service Options */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Recursos de Autoayuda
            </h2>
            <p className="text-lg text-slate-600">
              Encuentra respuestas rápidas en nuestros recursos disponibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Guías de Usuario",
                description: "Tutoriales paso a paso para usar la plataforma",
                count: "15+ Guías"
              },
              {
                icon: FileText,
                title: "Documentación",
                description: "Información detallada sobre funcionalidades",
                count: "50+ Artículos"
              },
              {
                icon: HelpCircle,
                title: "Preguntas Frecuentes",
                description: "Respuestas a las consultas más comunes",
                count: "30+ FAQs"
              },
              {
                icon: Users,
                title: "Comunidad",
                description: "Comparte experiencias con otros usuarios",
                count: "500+ Miembros"
              }
            ].map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white hover:bg-slate-50 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <IconComponent className="w-6 h-6 text-slate-600" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{resource.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                    <div className="text-xs text-blue-600 font-medium">{resource.count}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-slate-600">
              Las consultas más comunes de nuestros usuarios
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Cómo publico un requerimiento de carga?",
                answer: "Para publicar un requerimiento, inicia sesión en tu cuenta, ve a la sección 'Nuevo Requerimiento' y completa el formulario con los detalles de tu carga, origen, destino y fechas. Los agentes comenzarán a enviarte cotizaciones en pocas horas."
              },
              {
                question: "¿Cómo verifico la confiabilidad de un agente logístico?",
                answer: "Todos nuestros agentes pasan por un proceso de verificación que incluye validación de documentos, referencias comerciales y historial. Puedes ver las calificaciones, reseñas de otros clientes y certificaciones en su perfil."
              },
              {
                question: "¿Qué pasa si hay problemas con mi embarque?",
                answer: "Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier problema. También ofrecemos un sistema de resolución de disputas y tenemos acuerdos con seguros especializados para proteger tu carga."
              },
              {
                question: "¿Puedo cancelar un embarque después de confirmar?",
                answer: "Las políticas de cancelación dependen del agente y del timing. Generalmente hay un período de gracia, pero te recomendamos revisar los términos específicos antes de confirmar. Nuestro equipo puede ayudarte a negociar en casos especiales."
              },
              {
                question: "¿Cómo funciona el sistema de pagos?",
                answer: "LogBid facilita la conexión pero los pagos se realizan directamente entre importador y agente según los términos acordados. Ofrecemos opciones de pago seguro a través de terceros de confianza para mayor seguridad."
              },
              {
                question: "¿Qué documentos necesito para importar?",
                answer: "Los documentos varían según el tipo de mercancía y países origen/destino. Típicamente necesitas: factura comercial, lista de empaque, conocimiento de embarque, certificados de origen y permisos específicos. Tu agente te guiará en el proceso."
              }
            ].map((faq, index) => (
              <Card key={index} className="border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="text-xl font-bold text-slate-900 pr-8">{faq.question}</h3>
                      <div className="w-6 h-6 text-slate-500 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="mt-6 text-slate-600 leading-relaxed text-lg">
                      {faq.answer}
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿No encontraste lo que buscas?
            </h2>
            <p className="text-lg text-slate-600">
              Contáctanos directamente y te ayudaremos a resolver tu consulta
            </p>
          </div>

          <Card className="border border-slate-200 shadow-xl bg-white">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Información de Contacto
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        title: "Email General",
                        content: "soporte@logbid.co",
                        description: "Para consultas generales y soporte"
                      },
                      {
                        icon: Phone,
                        title: "Teléfono",
                        content: "+57 3208400890",
                        description: "Lunes a Viernes, 8AM - 8PM"
                      },
                      {
                        icon: MessageCircle,
                        title: "Chat en Vivo",
                        content: "Disponible en la plataforma",
                        description: "Respuesta inmediata 24/7"
                      }
                    ].map((contact, index) => {
                      const IconComponent = contact.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-900">{contact.title}</h4>
                            <p className="text-blue-600 font-medium">{contact.content}</p>
                            <p className="text-slate-600 text-sm">{contact.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Envíanos un Mensaje
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                      <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Tu nombre " />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="tu.email@ejemplo.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Asunto</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Consulta General</option>
                        <option>Problema Técnico</option>
                        <option>Problema con Embarque</option>
                        <option>Facturación</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                      <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Describe tu consulta o problema..."></textarea>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md">
                      Enviar Mensaje
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SoportePage;
