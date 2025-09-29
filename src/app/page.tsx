'use client'

import { Button } from "@/components/ui/button";
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, CheckCircle, Globe, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Hero Section - Full Screen with Banner */}
      <section className="relative min-h-screen flex items-center" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/logbid_banner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-6 md:space-y-8">
                {/* Professional Badge */}
                <div className="inline-flex items-center bg-blue-600/10 border border-blue-400/20 rounded-md px-3 py-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-blue-300 font-medium text-xs uppercase tracking-wide">{t('hero.badge')}</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight">
                    {t('hero.title')}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-normal max-w-2xl">
                    {t('hero.subtitle')}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register-importer">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-md font-medium w-full sm:w-auto transition-colors">
                      {t('hero.ctaImporter')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  
                  <Link href="/register-agent">
                    <Button size="lg" variant="outline" className="border border-gray-300 text-gray-200 hover:bg-white/10 hover:border-gray-200 text-base px-6 py-3 rounded-md font-medium w-full sm:w-auto transition-colors">
                      <Users className="mr-2 w-4 h-4" />
                    {t('hero.ctaAgent')}
                  </Button>
                  </Link>
                </div>

              </div>
            </div>

            {/* Right Content - How It Works (Professional) */}
            <div className="relative lg:block hidden">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-white/20">
                <h3 className="font-semibold text-gray-900 text-lg mb-6">{t('rightContent.title')}</h3>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{t('rightContent.step1.title')}</h4>
                      <p className="text-sm text-gray-600">{t('rightContent.step1.description')}</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{t('rightContent.step2.title')}</h4>
                      <p className="text-sm text-gray-600">{t('rightContent.step2.description')}</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{t('rightContent.step3.title')}</h4>
                      <p className="text-sm text-gray-600">{t('rightContent.step3.description')}</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium">4</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{t('rightContent.step4.title')}</h4>
                      <p className="text-sm text-gray-600">{t('rightContent.step4.description')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{t('rightContent.savings.title')}</p>
                    <p className="text-sm text-gray-600">{t('rightContent.savings.subtitle')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('benefits.savings')}</h3>
              <p className="text-gray-600">{t('benefits.savingsDescription')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('benefits.transparency')}</h3>
              <p className="text-gray-600">{t('benefits.transparencyDescription')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('benefits.agents')}</h3>
              <p className="text-gray-600">{t('benefits.agentsDescription')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('benefits.realTime')}</h3>
              <p className="text-gray-600">{t('benefits.realTimeDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Graphics Grid */}
          <div className="space-y-16 mb-16">
            {/* Graphic 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <Image src="/graphic_one.png" alt="Subasta Inversa" className="w-full h-80 object-contain mx-auto rounded-lg" width={500} height={500} />
              </div>
              <div className="lg:w-1/2 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('graphics.graphic1.title')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{t('graphics.graphic1.description')}</p>
              </div>
            </div>

            {/* Graphic 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="lg:w-1/2">
                <Image src="/graphic_two.png" alt="Métricas de Entregas" className="w-full h-80 object-contain mx-auto rounded-lg" width={500} height={500} />
              </div>
              <div className="lg:w-1/2 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('graphics.graphic2.title')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{t('graphics.graphic2.description')}</p>
              </div>
            </div>

            {/* Graphics 3 & 4 - Professional Vertical Cards Side by Side */}
            <div className="flex justify-center">
              <div className="w-full max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Graphic 3 */}
                  <div className="group bg-white rounded-2xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-full mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                          <Image src="/graphic_three.png" alt="Análisis de Mercado" className="w-full h-72 object-contain mx-auto" width={500} height={500} />
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold mb-4">
                          <Zap className="w-4 h-4 mr-2" />
                          {t('graphics.graphic3.badge')}
                        </div>
                        <h3 className="text-3xl font-bold text-black mb-6">{t('graphics.graphic3.title')}</h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{t('graphics.graphic3.description')}</p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-blue-600" />
                            {(t('graphics.graphic3.features') as string[])[0]}
                          </span>
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-blue-600" />
                            {(t('graphics.graphic3.features') as string[])[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Graphic 4 */}
                  <div className="group bg-white rounded-2xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-full mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                          <Image src="/graphic_four.png" alt="Optimización de Rutas" className="w-full h-72 object-contain mx-auto" width={500} height={500} />
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold mb-4">
                          <Zap className="w-4 h-4 mr-2" />
                          {t('graphics.graphic4.badge')}
                        </div>
                        <h3 className="text-3xl font-bold text-black mb-6">{t('graphics.graphic4.title')}</h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{t('graphics.graphic4.description')}</p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-blue-600" />
                            {(t('graphics.graphic4.features') as string[])[0]}
                          </span>
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-blue-600" />
                            {(t('graphics.graphic4.features') as string[])[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LogBid</h3>
              <p className="text-gray-400 mb-4">
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/servicios" className="hover:text-white transition-colors">{t('nav.services')}</Link></li>
                <li><Link href="/precios" className="hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/como-funciona" className="hover:text-white transition-colors">{t('nav.howItWorks')}</Link></li>
                <li><Link href="/soporte" className="hover:text-white transition-colors">{t('nav.support')}</Link></li>
                <li><Link href="/soporte" className="hover:text-white transition-colors">{t('footer.contact')}</Link></li>
                <li><Link href="/soporte" className="hover:text-white transition-colors">{t('footer.blog')}</Link></li>
                <li><Link href="/soporte" className="hover:text-white transition-colors">{t('footer.careers')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/soporte" className="hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
                <li><Link href="/soporte" className="hover:text-white transition-colors">{t('footer.terms')}</Link></li>
                <li><Link href="/soporte" className="hover:text-white transition-colors">{t('footer.cookies')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 pre LogBid. {t('footer.allRights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}