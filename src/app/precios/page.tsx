'use client'
import LanguageSelector from '@/components/LanguageSelector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Phone,
  Shield,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const PreciosPage = () => {
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
              <Link href="/precios" className="text-blue-800 font-medium">
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

      {/* Header Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              {
                type: t('pricing.importers.type'),
                subtitle: t('pricing.importers.subtitle'),
                price: t('pricing.importers.price'),
                period: t('pricing.importers.period'),
                description: t('pricing.importers.description'),
                features: t('pricing.importers.features'),
                cta: t('pricing.importers.cta'),
                popular: false,
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                buttonColor: "bg-blue-600 hover:bg-blue-700"
              },
              {
                type: t('pricing.agents.type'),
                subtitle: t('pricing.agents.subtitle'),
                price: t('pricing.agents.price'),
                period: t('pricing.agents.period'),
                description: t('pricing.agents.description'),
                features: t('pricing.agents.features'),
                cta: t('pricing.agents.cta'),
                popular: true,
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                buttonColor: "bg-green-600 hover:bg-green-700"
              }
            ].map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 font-bold text-sm">
                      {t('pricing.agents.popular')}
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full border-2 ${plan.borderColor} shadow-lg transition-all duration-300 ${plan.bgColor} ${plan.popular ? 'scale-105' : 'hover:scale-105'}`}>
                  <CardContent className="p-10 h-full flex flex-col">
                    
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{plan.type}</h3>
                      <p className="text-slate-600 mb-8">{plan.subtitle}</p>
                      
                      <div className="mb-6">
                        <div className="text-5xl font-bold text-slate-900 mb-2">
                          {plan.price}
                        </div>
                        <div className="text-slate-600 font-medium">{plan.period}</div>
                      </div>
                      
                      <p className="text-slate-600 leading-relaxed">{plan.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-10 flex-grow">
                      {(plan.features as string[]).map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex items-start text-slate-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className={`w-full ${plan.buttonColor} text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-500 rounded-md`}>
                      {plan.cta}
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            ¿Necesitas una solución empresarial?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Ofrecemos planes personalizados para grandes empresas con volúmenes altos y necesidades específicas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Users,
                title: "Equipos Grandes",
                description: "Gestión de múltiples usuarios y departamentos"
              },
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                description: "Controles de acceso y auditoría empresarial"
              },
              {
                icon: Zap,
                title: "Integración API",
                description: "Conecta con tus sistemas ERP y TMS existentes"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <Button variant="outline" size="lg" className="font-semibold border-2 border-slate-300 hover:bg-slate-50">
            <Phone className="mr-3 w-5 h-5" />
            Contactar Ventas Empresariales
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Preguntas Frecuentes sobre Precios
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Por qué es gratis para importadores?",
                answer: "Nuestro modelo de negocio se basa en crear valor para ambas partes. Los importadores obtienen mejores precios a través de la competencia, mientras que los agentes pagan solo cuando generan negocios reales."
              },
              {
                question: "¿Cuál es la comisión para agentes logísticos?",
                answer: "La comisión varía según el tipo de servicio y volumen. Contacta a nuestro equipo comercial para conocer las tarifas específicas para tu caso."
              },
              {
                question: "¿Hay costos ocultos o tarifas adicionales?",
                answer: "No, somos completamente transparentes. Los importadores no pagan nada, y los agentes solo pagan comisión por negocios cerrados exitosamente."
              },
              {
                question: "¿Puedo cancelar mi cuenta en cualquier momento?",
                answer: "Sí, puedes cancelar tu cuenta en cualquier momento sin penalización. No hay contratos a largo plazo ni compromisos mínimos."
              },
              {
                question: "¿Ofrecen descuentos por volumen?",
                answer: "Para agentes con alto volumen de transacciones, ofrecemos tarifas preferenciales. Contacta a nuestro equipo para más detalles."
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

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Únete a LogBid hoy y comienza a optimizar tu logística internacional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-md font-semibold" onClick={() => window.location.href = 'https://app.logbid.co/auth/register'}>
              Comenzar como Importador
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-300 text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4 rounded-md font-semibold" onClick={() => window.location.href = 'https://app.logbid.co/auth/register'}>
              Aplicar como Agente
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreciosPage;
