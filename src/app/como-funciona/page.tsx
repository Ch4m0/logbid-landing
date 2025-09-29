'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';
import { 
  Package, 
  Users, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Search,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

const ComoFuncionaPage = () => {
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
              <Link href="/como-funciona" className="text-blue-800 font-medium">
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

      {/* Header Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('howItWorks.title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: t('howItWorks.step1.title'),
                description: t('howItWorks.step1.description'),
                icon: Package,
                features: t('howItWorks.step1.features'),
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600"
              },
              {
                step: "02", 
                title: t('howItWorks.step2.title'),
                description: t('howItWorks.step2.description'),
                icon: Users,
                features: t('howItWorks.step2.features'),
                bgColor: "bg-green-50",
                iconColor: "text-green-600"
              },
              {
                step: "03",
                title: t('howItWorks.step3.title'),
                description: t('howItWorks.step3.description'),
                icon: CheckCircle,
                features: t('howItWorks.step3.features'),
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600"
              }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-slate-200 z-0"></div>
                  )}
                  
                  <Card className="relative z-10 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardContent className="p-8 text-center">
                      
                      {/* Step Number and Icon */}
                      <div className="relative mb-8">
                        <div className={`w-20 h-20 mx-auto ${step.bgColor} rounded-full flex items-center justify-center shadow-lg mb-4`}>
                          <span className="text-2xl font-bold text-slate-900">{step.step}</span>
                        </div>
                        <div className={`w-16 h-16 mx-auto ${step.bgColor} rounded-2xl flex items-center justify-center shadow-xl -mt-2`}>
                          <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                        {step.description}
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {(step.features as string[]).map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center text-slate-700 justify-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Logistics Agents Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Para Agentes Logísticos
            </h2>
            <p className="text-lg text-slate-600">
              Únete a nuestra red de proveedores verificados y accede a nuevas oportunidades de negocio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Encuentra Oportunidades",
                description: "Accede a requerimientos de carga de importadores verificados en tiempo real.",
                bgColor: "bg-orange-50",
                iconColor: "text-orange-600"
              },
              {
                icon: MessageSquare,
                title: "Cotiza Competitivamente",
                description: "Presenta tus mejores ofertas y destaca tus fortalezas y servicios diferenciados.",
                bgColor: "bg-teal-50",
                iconColor: "text-teal-600"
              },
              {
                icon: FileCheck,
                title: "Cierra Negocios",
                description: "Gestiona tus contratos y construye relaciones a largo plazo con nuevos clientes.",
                bgColor: "bg-indigo-50",
                iconColor: "text-indigo-600"
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${item.bgColor} rounded-lg flex items-center justify-center mb-6 mx-auto`}>
                      <IconComponent className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Beneficios de Usar LogBid
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    title: "Ahorro de Tiempo",
                    description: "Reduce el tiempo de cotización de semanas a días con nuestro proceso automatizado."
                  },
                  {
                    title: "Mejores Precios",
                    description: "La competencia entre proveedores garantiza precios más competitivos para tu carga."
                  },
                  {
                    title: "Transparencia Total",
                    description: "Compara ofertas detalladas con información clara sobre servicios y tiempos."
                  },
                  {
                    title: "Proveedores Verificados",
                    description: "Todos nuestros agentes pasan por un proceso de verificación riguroso."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  ¿Listo para comenzar?
                </h3>
                <p className="text-slate-600 mb-8">
                  Únete a cientos de importadores que ya están optimizando su logística con LogBid
                </p>
                <div className="space-y-4">
                  <Link href="/register-importer">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                      Comenzar como Importador
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/register-agent">
                    <Button size="lg" variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-3">
                      Unirse como Agente
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComoFuncionaPage;
