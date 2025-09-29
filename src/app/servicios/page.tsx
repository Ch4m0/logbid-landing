'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';
import { 
  Ship, 
  Package, 
  Plane, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const ServiciosPage = () => {
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
              <Link href="/servicios" className="text-blue-800 font-medium">
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

      {/* Header Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Ship,
                title: t('services.fcl.title'),
                description: t('services.fcl.description'),
                features: t('services.fcl.features'),
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
                borderColor: "border-blue-200"
              },
              {
                icon: Package,
                title: t('services.lcl.title'),
                description: t('services.lcl.description'),
                features: t('services.lcl.features'),
                bgColor: "bg-green-50", 
                iconColor: "text-green-600",
                borderColor: "border-green-200"
              },
              {
                icon: Plane,
                title: t('services.air.title'),
                description: t('services.air.description'),
                features: t('services.air.features'),
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600",
                borderColor: "border-purple-200"
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className={`border-2 ${service.borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white`}>
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${service.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                      <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {(service.features as string[]).map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex items-center text-slate-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button className={`w-full bg-gradient-to-r ${service.bgColor.replace('bg-', 'from-').replace('-50', '-500')} to-${service.iconColor.replace('text-', '').replace('-600', '-400')} text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-500`}>
                      {t('services.exploreService')}
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-lg text-slate-600">
              Servicios complementarios para una experiencia logística completa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Despacho Aduanero",
                description: "Gestión completa de trámites aduaneros y documentación"
              },
              {
                title: "Seguro de Carga",
                description: "Protección completa para tus mercancías durante el transporte"
              },
              {
                title: "Almacenaje",
                description: "Instalaciones seguras para almacenamiento temporal"
              },
              {
                title: "Distribución Local",
                description: "Entrega final en destino y distribución urbana"
              }
            ].map((service, index) => (
              <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {service.description}
                  </p>
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
            ¿Listo para optimizar tu logística?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Obtén cotizaciones de múltiples proveedores y elige la mejor opción
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-md font-semibold" onClick={() => window.location.href = 'https://app.logbid.co/auth/register'}>
            Comenzar Ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServiciosPage;
