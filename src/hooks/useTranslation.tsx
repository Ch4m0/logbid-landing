'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos para las traducciones
type TranslationValue = string | string[];

interface TranslationContextType {
  currentLanguage: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string, variables?: Record<string, string | number>) => TranslationValue;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Traducciones
const translations = {
  en: {
    // Navigation
    nav: {
      services: "Services",
      howItWorks: "How It Works",
      pricing: "Pricing", 
      support: "Support",
      login: "Get Started",
      marketplaceTagline: "International Logistics"
    },
    // Hero Section
    hero: {
      badge: "🚀 International Logistics",
      title: "Smart Logistics for Modern Business",
      subtitle: "Connect with verified logistics agents globally. Save up on your shipments and reduce 95% of management time.",
      ctaImporter: "Start as Importer",
      ctaAgent: "Join as Agent",
      platformNumberOne: "Platform #1 in Latin America",
      yourBusinessFlow: "Your Business Flow",
      asImporter: "as Importer",
      discoverHowLogBid: "Discover how LogBid transforms your shipment management with full transparency and guaranteed savings.",
      asAgent: "as Agent",
      discoverHowLogBidAgent: "Discover how LogBid will transform how you win clients and manage shipments intelligently."
    },
    // Dashboard
    dashboard: {
      route: "Shanghai → Bogotá",
      container: "Container 40' FCL",
      liveOffers: "5 Live Offers",
      selectButton: "Select",
      days: "days",
      vsMarket: "vs market"
    },
    // Stats
    stats: {
      activeImporters: "Active Importers",
      verifiedAgents: "Verified Agents", 
      timeReduction: "Time Reduction",
      premiumSupport: "Premium Support"
    },
    // Services
    services: {
      title: "World-Class Services",
      subtitle: "Complete logistics experience with cutting-edge technology and exceptional support",
      fcl: {
        title: "FCL Container Shipping",
        description: "Full containers with guaranteed rates and real-time tracking",
        features: ["45-day rate lock", "GPS tracking", "Digital documentation"]
      },
      lcl: {
        title: "LCL Consolidated",
        description: "Partial loads with smart consolidation and cost optimization",
        features: ["Automatic consolidation", "Multiple destinations", "Save"]
      },
      air: {
        title: "Air Freight Express", 
        description: "Premium air transport for urgent deliveries and special cargo",
        features: ["24-48h delivery", "Specialized handling", "Advanced tracking"]
      },
      exploreService: "Explore Service"
    },
    // How It Works
    howItWorks: {
      title: "How Does LogBid Work?",
      subtitle: "In just 3 simple steps connect with the best logistics agents and get the best rates",
      step1: {
        title: "Post Your Request",
        description: "Complete a simple form with your shipment details: origin, destination, cargo type and required dates.",
        features: ["Intuitive form", "Detailed specifications", "Flexible dates"]
      },
      step2: {
        title: "Receive Competitive Offers", 
        description: "Verified logistics agents compete for your shipment, sending you personalized offers in real time.",
        features: ["Multiple offers", "Verified agents", "Competitive prices"]
      },
      step3: {
        title: "Select and Ship",
        description: "Compare offers, select the best option and manage your entire shipment from our platform.",
        features: ["Easy comparison", "Complete tracking", "24/7 support"]
      },
      cta: "Start Now",
      promise: "No commitments • No hidden costs • 2-minute setup"
    },
    // Pricing
    pricing: {
      title: "Simple and Fair Rates",
      subtitle: "No hidden costs, no surprises. You only pay when your shipment is successful.",
      importers: {
        type: "For Importers",
        subtitle: "Find the best rates",
        price: "Free",
        period: "forever",
        description: "Complete access to our network of verified agents",
        features: [
          "Unlimited request posting",
          "Receive competitive offers", 
          "Compare prices and times",
          "Real-time shipment tracking",
          "24/7 customer support",
          "No commissions on your shipments"
        ],
        cta: "Start as Importer"
      },
      agents: {
        type: "For Logistics Agents",
        subtitle: "Expand your client network", 
        price: "5%",
        period: "commission per successful shipment",
        description: "Connect with active importers and grow your business",
        features: [
          "Access to importer requests",
          "Verified and featured profile",
          "Advanced quoting tools",
          "Complete management dashboard", 
          "Secure and fast payments",
          "First 3 months commission-free"
        ],
        cta: "Join as Agent",
        popular: "⭐ Most Popular"
      },
      enterprise: "Need an enterprise plan? Contact us for custom solutions",
      contactSales: "Talk to Sales"
    },
    // Support
    support: {
      title: "We're Here 24/7",
      subtitle: "Our team of experts is available when you need them",
      liveChat: {
        title: "Live Chat",
        description: "Immediate response to your queries",
        availability: "24/7 available"
      },
      phoneSupport: {
        title: "Phone Support", 
        description: "Speak directly with our specialists",
        availability: "Mon-Fri 8AM-8PM"
      },
      emailSupport: {
        title: "Email Support",
        description: "Detailed queries and documentation", 
        availability: "2-hour response"
      },
      helpNow: {
        title: "Need Help Now?",
        description: "Our team of logistics specialists is ready to help you with any query",
        startChat: "Start Chat",
        callNow: "Call Now"
      }
    },
    // CTA Section
    cta: {
      title: "Ready to Transform Your Logistics?",
      subtitle: "Join more than 800 companies that revolutionized their logistics operations with LogBid",
      startImporter: "Start as Importer",
      joinAgent: "Join as Agent",
      stats: {
        free: "Free",
        freeSubtitle: "Registration",
        commission: "0%",
        commissionSubtitle: "Initial Commission", 
        support: "24/7",
        supportSubtitle: "Support"
      }
    },
    // Testimonials
    testimonials: {
      title: "What Our Clients Say",
      maria: {
        name: "Maria González",
        role: "Import Director",
        company: "TechImport SA", 
        content: "LogBid completely transformed our import process. Now we find the best rates in minutes instead of days. The savings have been incredible."
      },
      carlos: {
        name: "Carlos Mendoza",
        role: "Logistics Agent",
        company: "Global Shipping",
        content: "As an agent, LogBid connected me with clients I would never have reached. My business grew 200% in the first year. The platform is intuitive and professional."
      }
    },
    // FAQ
    faq: {
      title: "Everything You Need to Know",
      q1: {
        question: "How exactly does LogBid work?",
        answer: "LogBid is a platform that connects importers with verified logistics agents. You post your request, receive multiple competitive offers, compare and select the best option for your business."
      },
      q2: {
        question: "How much can I save using LogBid?",
        answer: "Our clients save on average 40% on their logistics costs thanks to transparent competition between agents. Additionally, you reduce 95% of management time."
      },
      q3: {
        question: "Are the agents verified?",
        answer: "Yes, all our agents go through a rigorous verification process that includes legal documentation, commercial references and continuous performance evaluations."
      },
      q4: {
        question: "Do you offer 24/7 support?",
        answer: "Absolutely. We have a team of experts available 24/7 to assist you at any time in the process, from quotation to final delivery."
      },
      q5: {
        question: "Are there hidden costs?",
        answer: "No. LogBid is transparent in all its costs. Registration is free and we only charge a small commission when a shipment is successfully completed."
      }
    },
    // Footer
    footer: {
      description: "Transforming international logistics through innovative technology, connecting importers with the world's best logistics agents.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      services: "Services",
      support: "Support",
      helpCenter: "Help Center",
      contact24: "24/7 Contact",
      apiDocs: "API Docs", 
      terms: "Terms",
      privacy: "Privacy",
      customsClearance: "Customs Clearance",
      cargoInsurance: "Cargo Insurance",
      copyright: "© 2025 LogBid. All rights reserved.",
      certifiedBy: "Certified by:",
      zimPartnership: "ZIM Partnership",
      fmcRegistered: "FMC Registered", 
      iataCertified: "IATA Certified",
      allRights: "All rights reserved."
    },
    // Keys used in importer register page
    businessFlow: {
      importerTitle: "Importer Business Flow",
      creation: "CREATION",
      creationDescription: "Register your shipment with basic details. The platform automatically notifies agents in the selected market.",
      quotations: "QUOTATIONS",
      quotationsDescription: "Agents send competitive proposals. Monitor offers on a real-time dashboard.",
      evaluation: "EVALUATION",
      evaluationDescription: "Compare proposals by price, services, and agent reputation. Choose the best offer.",
      confirmation: "CONFIRMATION",
      confirmationDescription: "The system generates the contract automatically. Direct contact is established with the winning agent.",
      execution: "EXECUTION",
      executionDescription: "The agent coordinates logistics (space booking, documentation, tracking). You monitor progress.",
      totalDays: "Total Days",
      savings: "Savings"
    },
    benefits: {
      savings: "Savings",
      savingsDescription: "Reduce logistics costs with full price transparency",
      transparency: "Full Transparency",
      transparencyDescription: "Complete visibility of the quoting process",
      agents: "Agents",
      agentsDescription: "Verified network of logistics providers",
      realTime: "Real Time",
      realTimeDescription: "24/7 monitoring and tracking of your shipments"
    },
    graphics: {
      graphic1: {
        title: "Smart Reverse Auction",
        description: "Transform the way you contract logistics. Verified agents compete in real time for your shipments, creating transparent competition that guarantees up to 40% savings on transportation costs. Each offer is automatically validated and rated.",
        badge: "Advanced Intelligence",
        features: ["Real-time analysis", "Accurate predictions"]
      },
      graphic2: {
        title: "Real-time Metrics",
        description: "Monitor your supply chain performance with advanced dashboards. Visualize offered, in-transit and completed shipments. Identify bottlenecks and optimize your operations with historical data and delivery predictions.",
        badge: "Live Monitoring",
        features: ["Performance tracking", "Predictive analytics"]
      },
      graphic3: {
        title: "Market Intelligence",
        description: "Access deep insights on price trends, available capacity and market behavior. Our algorithms analyze millions of transactions to predict fluctuations and help you make informed strategic decisions.",
        badge: "Advanced Intelligence",
        features: ["Real-time analysis", "Accurate predictions"]
      },
      graphic4: {
        title: "Predictive Optimization",
        description: "Reduce operational costs with AI algorithms that optimize routes, consolidate cargo and predict delays. Our system learns from each shipment to continuously improve the efficiency of your international logistics.",
        badge: "Predictive AI",
        features: ["Automatic optimization", "Continuous learning"]
      }
    },
    rightContent: {
      title: "How does it work?",
      step1: {
        title: "Post your shipment",
        description: "Create a request with origin, destination and details"
      },
      step2: {
        title: "Receive quotes",
        description: "Verified agents compete with transparent prices"
      },
      step3: {
        title: "Select the best",
        description: "Compare prices, times and ratings"
      },
      step4: {
        title: "Your cargo travels",
        description: "Real-time tracking to destination"
      },
      savings: {
        title: "Save",
        subtitle: "vs. traditional methods"
      }
    },
    businessFlowAgent: {
      title: "How Your Business Works on LogBid",
      step1Title: "You Receive Automatic Notifications",
      step1Description: "The system alerts you in real time about new shipments in your specific market.",
      step2Title: "You Analyze and Send Your Proposal",
      step2Description: "You assess shipment details and submit your competitive quotation directly.",
      step3Title: "You Win the Contract and Execute",
      step3Description: "If selected, you coordinate the shipment and build your reputation.",
      step4Title: "You Get Rated and More Opportunities",
      step4Description: "With each successful shipment, you increase credibility and access better contracts."
    },
    benefitsAgent: {
      revenue: "Revenue",
      revenueDescription: "Increase your average revenue in the first 6 months",
      time: "95% Less Time",
      timeDescription: "Reduce time in administrative management",
      importers: "Importers",
      importersDescription: "Direct access to our client network",
      reputation: "Reputation System",
      reputationDescription: "Build credibility and get more contracts"
    },
    testimonial: {
      name: "Maria Gonzalez",
      position: "Import Director - Retail Corp",
      quote: "With LogBid we reduced our logistics costs by 25% and cut quoting time from 2 weeks to 2 days."
    },
    testimonialAgent: {
      name: "Carlos Mendoza",
      position: "Freight Agent - Bogotá",
      quote: "LogBid completely changed my business. In 8 months I tripled my revenue and cut my administrative work in half."
    },
    register: {
      startRegistration: "Start Your Registration",
      joinImporters: "Join more than 800 successful importers",
      joinAgents: "Join more than 500 successful agents",
      step: "Step",
      personalInfo: "Personal Information",
      documents: "Documents",
      legalDocuments: "Legal Documents",
      legalDocumentsDescription: "Company legal information (required) - Fields marked with * are mandatory",
      certificationsTitle: "Certifications *",
      certificationsDescription: "Select the certifications you hold (required) - You must select at least one",
      certificationDocumentsTitle: "Certification Documents",
      certificationDocumentsDescription: "Upload PDFs of the selected certifications (required, max 10MB per file)",
      importerDocuments: "Importer Documents",
      requiredDocuments: "Required documents for importers - Fields marked with * are mandatory",
      rut: "RUT (TIN)",
      rutNumber: "RUT/TIN Number",
      rutPlaceholder: "e.g., 900123456-7",
      rutDocument: "RUT Document (PDF)",
      chamberOfCommerce: "Chamber of Commerce",
      chamberOfCommerceDocument: "Chamber of Commerce Certificate (PDF)",
      chamberOfCommerceValidation: "Must be issued within the last 30 days",
      legalRepresentative: "Legal Representative ID",
      legalRepresentativeDocument: "Identity Document (PDF)",
      nextDocuments: "Next: Documents",
      previous: "Previous",
      creatingAccount: "Creating account...",
      createImporterAccount: "Create Importer Account",
      createAgentAccount: "Create Agent Account",
      alreadyHaveAccount: "Already have an account? Sign in"
    },
    form: {
      personalInfo: "Personal Information",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      phone: "Phone",
      phonePlaceholder: "+1234567890",
      language: "Language",
      spanish: "Spanish",
      english: "English",
      credentials: "Credentials",
      password: "Password",
      passwordPlaceholder: "At least 6 characters",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Repeat your password",
      company: "Company",
      createNewCompany: "Create new company",
      companyName: "Company Name",
      companyNamePlaceholder: "Your company name",
      existingCompany: "Existing Company",
      selectCompany: "Select a company",
      markets: "Markets",
      marketsDescription: "Select the markets you usually import from",
      marketsAgentDescription: "You will only receive notifications from the selected markets"
    }
  },
  es: {
    // Navegación
    nav: {
      services: "Servicios",
      howItWorks: "Cómo Funciona",
      pricing: "Precios",
      support: "Soporte", 
      login: "Iniciar Sesión",
      marketplaceTagline: "Logística Internacional"
    },
    // Sección Hero
    hero: {
      badge: "🚀 Logística Internacional",
      title: "Logística Inteligente para Empresas Modernas",
      subtitle: "Conecta con agentes logísticos verificados globalmente. Ahorra en tus envíos y reduce 95% el tiempo de gestión.",
      ctaImporter: "Comenzar Como Importador",
      ctaAgent: "Unirse Como Agente",
      platformNumberOne: "Plataforma #1 en Latinoamérica",
      yourBusinessFlow: "Tu Flujo de Negocio",
      asImporter: "como Importador",
      discoverHowLogBid: "Descubre cómo LogBid transformará tu forma de gestionar embarques con transparencia total y ahorros garantizados.",
      asAgent: "como Agente",
      discoverHowLogBidAgent: "Descubre cómo LogBid transformará tu forma de conseguir clientes y gestionar embarques de manera inteligente."
    },
    // Dashboard
    dashboard: {
      route: "Shanghai → Bogotá", 
      container: "Container 40' FCL",
      liveOffers: "5 Ofertas en Vivo",
      selectButton: "Seleccionar",
      days: "días",
      vsMarket: "vs mercado"
    },
    // Estadísticas
    stats: {
      activeImporters: "Importadores Activos",
      verifiedAgents: "Agentes Verificados",
      timeReduction: "Reducción de Tiempo", 
      premiumSupport: "Soporte Premium"
    },
    // Servicios
    services: {
      title: "Servicios de Clase Mundial",
      subtitle: "Experiencia logística completa con tecnología de vanguardia y soporte excepcional",
      fcl: {
        title: "FCL Container Shipping",
        description: "Contenedores completos con tarifas garantizadas y seguimiento en tiempo real",
        features: ["Tarifas bloqueadas 45 días", "Seguimiento GPS", "Documentación digital"]
      },
      lcl: {
        title: "LCL Consolidado", 
        description: "Cargas parciales con consolidación inteligente y optimización de costos",
        features: ["Consolidación automática", "Múltiples destinos", "Ahorro"]
      },
      air: {
        title: "Air Freight Express",
        description: "Transporte aéreo premium para entregas urgentes y mercancías especiales",
        features: ["Entrega 24-48h", "Manejo especializado", "Seguimiento avanzado"]
      },
      exploreService: "Explorar Servicio"
    },
    // Cómo Funciona
    howItWorks: {
      title: "¿Cómo Funciona LogBid?",
      subtitle: "En solo 3 pasos simples conectas con los mejores agentes logísticos y obtienes las mejores tarifas",
      step1: {
        title: "Publica tu Solicitud",
        description: "Completa un formulario simple con los detalles de tu envío: origen, destino, tipo de carga y fechas necesarias.",
        features: ["Formulario intuitivo", "Especificaciones detalladas", "Fechas flexibles"]
      },
      step2: {
        title: "Recibe Ofertas Competitivas",
        description: "Agentes logísticos verificados compiten por tu envío, enviándote ofertas personalizadas en tiempo real.",
        features: ["Múltiples ofertas", "Agentes verificados", "Precios competitivos"]
      },
      step3: {
        title: "Selecciona y Envía",
        description: "Compara ofertas, selecciona la mejor opción y gestiona todo tu envío desde nuestra plataforma.",
        features: ["Comparación fácil", "Seguimiento completo", "Soporte 24/7"]
      },
      cta: "Iniciar Sesión",
      promise: "Sin compromisos • Sin costos ocultos • Configuración en 2 minutos"
    },
    // Precios
    pricing: {
      title: "Tarifas Simples y Justas",
      subtitle: "Sin costos ocultos, sin sorpresas. Solo pagas cuando tu envío es exitoso.",
      importers: {
        type: "Para Importadores",
        subtitle: "Encuentra las mejores tarifas",
        price: "Gratis",
        period: "para siempre",
        description: "Acceso completo a nuestra red de agentes verificados",
        features: [
          "Publicación ilimitada de solicitudes",
          "Recepción de ofertas competitivas",
          "Comparación de precios y tiempos", 
          "Seguimiento de envíos en tiempo real",
          "Soporte al cliente 24/7",
          "Sin comisiones en tus envíos"
        ],
        cta: "Comenzar Como Importador"
      },
      agents: {
        type: "Para Agentes Logísticos",
        subtitle: "Expande tu red de clientes",
        price: "5%",
        period: "comisión por envío exitoso",
        description: "Conecta con importadores activos y haz crecer tu negocio",
        features: [
          "Acceso a solicitudes de importadores",
          "Perfil verificado y destacado",
          "Herramientas de cotización avanzadas",
          "Dashboard de gestión completo",
          "Pagos seguros y rápidos", 
          "Primeros 3 meses sin comisión"
        ],
        cta: "Unirse Como Agente",
        popular: "⭐ Más Popular"
      },
      enterprise: "¿Necesitas un plan empresarial? Contáctanos para soluciones personalizadas",
      contactSales: "Hablar con Ventas"
    },
    // Soporte
    support: {
      title: "Estamos Aquí 24/7",
      subtitle: "Nuestro equipo de expertos está disponible cuando lo necesites",
      liveChat: {
        title: "Chat en Vivo",
        description: "Respuesta inmediata a tus consultas",
        availability: "24/7 disponible"
      },
      phoneSupport: {
        title: "Soporte Telefónico",
        description: "Habla directamente con nuestros especialistas",
        availability: "Lun-Vie 8AM-8PM"
      },
      emailSupport: {
        title: "Email Soporte",
        description: "Consultas detalladas y documentación",
        availability: "Respuesta en 2 horas"
      },
      helpNow: {
        title: "¿Necesitas Ayuda Ahora?",
        description: "Nuestro equipo de especialistas en logística está listo para ayudarte con cualquier consulta",
        startChat: "Iniciar Chat",
        callNow: "Llamar Ahora"
      }
    },
    // Sección CTA
    cta: {
      title: "¿Listo para Transformar tu Logística?",
      subtitle: "Únete a más de 800 empresas que revolucionaron sus operaciones logísticas con LogBid",
      startImporter: "Comenzar Como Importador",
      joinAgent: "Unirse Como Agente",
      stats: {
        free: "Gratis",
        freeSubtitle: "Registro",
        commission: "0%",
        commissionSubtitle: "Comisión Inicial",
        support: "24/7", 
        supportSubtitle: "Soporte"
      }
    },
    // Testimonios
    testimonials: {
      title: "Lo que dicen nuestros Clientes",
      maria: {
        name: "María González",
        role: "Directora de Importaciones",
        company: "TechImport SA",
        content: "LogBid transformó completamente nuestro proceso de importación. Ahora encontramos las mejores tarifas en minutos en lugar de días. El ahorro ha sido increíble."
      },
      carlos: {
        name: "Carlos Mendoza",
        role: "Agente Logístico", 
        company: "Global Shipping",
        content: "Como agente, LogBid me conectó con clientes que nunca habría alcanzado. Mi negocio creció 200% en el primer año. La plataforma es intuitiva y profesional."
      }
    },
    // FAQ
    faq: {
      title: "Todo lo que necesitas Saber",
      q1: {
        question: "¿Cómo funciona exactamente LogBid?",
        answer: "LogBid es una plataforma que conecta importadores con agentes logísticos verificados. Publicas tu solicitud, recibes múltiples ofertas competitivas, comparas y seleccionas la mejor opción para tu negocio."
      },
      q2: {
        question: "¿Cuánto puedo ahorrar usando LogBid?",
        answer: "Nuestros clientes ahorran en promedio 40% en sus costos logísticos gracias a la competencia transparente entre agentes. Además, reduces 95% el tiempo de gestión."
      },
      q3: {
        question: "¿Los agentes están verificados?",
        answer: "Sí, todos nuestros agentes pasan por un riguroso proceso de verificación que incluye documentación legal, referencias comerciales y evaluaciones de desempeño continuas."
      },
      q4: {
        question: "¿Ofrecen soporte 24/7?",
        answer: "Absolutamente. Tenemos un equipo de expertos disponible 24/7 para asistirte en cualquier momento del proceso, desde la cotización hasta la entrega final."
      },
      q5: {
        question: "¿Hay costos ocultos?",
        answer: "No. LogBid es transparente en todos sus costos. El registro es gratuito y solo cobramos una pequeña comisión cuando se completa exitosamente un envío."
      }
    },
    // Footer
    footer: {
      description: "Transformando la logística internacional a través de tecnología innovadora, conectando importadores con los mejores agentes logísticos del mundo.",
      product: "Producto",
      company: "Empresa",
      legal: "Legal",
      services: "Servicios",
      support: "Soporte",
      helpCenter: "Centro de Ayuda",
      contact24: "Contacto 24/7", 
      apiDocs: "API Docs",
      terms: "Términos",
      privacy: "Privacidad",
      customsClearance: "Customs Clearance",
      cargoInsurance: "Cargo Insurance",
      copyright: "© 2025 LogBid. Todos los derechos reservados.",
      certifiedBy: "Certificado por:",
      zimPartnership: "ZIM Partnership",
      fmcRegistered: "FMC Registered",
      iataCertified: "IATA Certified",
      allRights: "Todos los derechos reservados."
    },
    // Keys used in importer register page
    businessFlow: {
      importerTitle: "Flujo de Negocio del Importador",
      creation: "CREACIÓN",
      creationDescription: "Registras embarque con datos básicos. La plataforma notifica automáticamente a agentes del mercado.",
      quotations: "COTIZACIONES",
      quotationsDescription: "Agentes envían propuestas competitivas. Monitoreas ofertas en dashboard en tiempo real.",
      evaluation: "EVALUACIÓN",
      evaluationDescription: "Comparas propuestas por precio, servicios y reputación del agente. Seleccionas la mejor oferta.",
      confirmation: "CONFIRMACIÓN",
      confirmationDescription: "Sistema genera contrato automáticamente. Se establece contacto directo con agente ganador.",
      execution: "EJECUCIÓN",
      executionDescription: "Agente coordina logística (reserva espacio, documentación, seguimiento). Monitoreas progreso.",
      totalDays: "Días Total",
      savings: "Ahorro"
    },
    benefits: {
      savings: "Ahorro",
      savingsDescription: "Reduce costos logísticos con transparencia total en precios",
      transparency: "Transparencia Total",
      transparencyDescription: "Visibilidad completa del proceso de cotización",
      agents: "Agentes",
      agentsDescription: "Red verificada de proveedores logísticos",
      realTime: "Tiempo Real",
      realTimeDescription: "Monitoreo y seguimiento 24/7 de tus embarques"
    },
    graphics: {
      graphic1: {
        title: "Subasta Inversa Inteligente",
        description: "Transforma la forma de contratar logística. Los agentes verificados compiten en tiempo real por tus embarques, creando una competencia transparente que garantiza hasta 40% de ahorro en costos de transporte. Cada oferta es validada y calificada automáticamente.",
        badge: "Inteligencia Avanzada",
        features: ["Análisis en tiempo real", "Predicciones precisas"]
      },
      graphic2: {
        title: "Métricas en Tiempo Real",
        description: "Monitorea el rendimiento de tu cadena de suministro con dashboards avanzados. Visualiza embarques ofertados, en tránsito y completados. Identifica cuellos de botella y optimiza tus operaciones con datos históricos y predicciones de entrega.",
        badge: "Monitoreo en Vivo",
        features: ["Seguimiento de rendimiento", "Análisis predictivo"]
      },
      graphic3: {
        title: "Inteligencia de Mercado",
        description: "Accede a insights profundos sobre tendencias de precios, capacidad disponible y comportamiento del mercado. Nuestros algoritmos analizan millones de transacciones para predecir fluctuaciones y ayudarte a tomar decisiones estratégicas informadas.",
        badge: "Inteligencia Avanzada",
        features: ["Análisis en tiempo real", "Predicciones precisas"]
      },
      graphic4: {
        title: "Optimización Predictiva",
        description: "Reduce costos operativos con algoritmos de IA que optimizan rutas, consolidan cargas y predicen demoras. Nuestro sistema aprende de cada envío para mejorar continuamente la eficiencia de tu logística internacional.",
        badge: "IA Predictiva",
        features: ["Optimización automática", "Aprendizaje continuo"]
      }
    },
    rightContent: {
      title: "¿Cómo funciona?",
      step1: {
        title: "Publicas tu embarque",
        description: "Crea una solicitud con origen, destino y detalles"
      },
      step2: {
        title: "Recibes cotizaciones",
        description: "Agentes verificados compiten con precios transparentes"
      },
      step3: {
        title: "Seleccionas la mejor",
        description: "Compara precios, tiempos y calificaciones"
      },
      step4: {
        title: "Tu carga viaja",
        description: "Seguimiento en tiempo real hasta destino"
      },
      savings: {
        title: "Ahorra",
        subtitle: "vs. métodos tradicionales"
      }
    },
    businessFlowAgent: {
      title: "Cómo Funciona tu Negocio en LogBid",
      step1Title: "Recibes Notificaciones Automáticas",
      step1Description: "El sistema te alerta sobre nuevos embarques en tu mercado específico en tiempo real.",
      step2Title: "Analizas y Envías tu Propuesta",
      step2Description: "Evalúas los detalles del embarque y envías tu cotización competitiva directamente.",
      step3Title: "Ganas el Contrato y Ejecutas",
      step3Description: "Si eres seleccionado, coordinas el embarque y construyes tu reputación.",
      step4Title: "Recibes Calificación y Más Oportunidades",
      step4Description: "Con cada embarque exitoso, aumentas tu credibilidad y accedes a mejores contratos."
    },
    benefitsAgent: {
      revenue: "+40% Ingresos",
      revenueDescription: "Aumenta tus ingresos promedio en los primeros 6 meses",
      time: "95% Menos Tiempo",
      timeDescription: "Reduce tiempo en gestión administrativa",
      importers: "+800 Importadores",
      importersDescription: "Acceso directo a nuestra red de clientes",
      reputation: "Sistema de Reputación",
      reputationDescription: "Construye credibilidad y obtén más contratos"
    },
    testimonial: {
      name: "María González",
      position: "Directora de Importaciones - Retail Corp",
      quote: "Con LogBid redujimos nuestros costos de logística en un 25% y el tiempo de cotización de 2 semanas a 2 días."
    },
    testimonialAgent: {
      name: "Carlos Mendoza",
      position: "Agente de Carga - Bogotá",
      quote: "LogBid cambió completamente mi negocio. En 8 meses tripliqué mis ingresos y reduje mi trabajo administrativo a la mitad."
    },
    register: {
      startRegistration: "Comienza tu Registro",
      joinImporters: "Únete a más de 800 importadores exitosos",
      joinAgents: "Únete a más de 500 agentes exitosos",
      step: "Paso",
      personalInfo: "Información Personal",
      documents: "Documentos",
      legalDocuments: "Documentos Legales",
      legalDocumentsDescription: "Información legal de la empresa (requerido) - Los campos marcados con * son obligatorios",
      certificationsTitle: "Certificaciones *",
      certificationsDescription: "Selecciona las certificaciones que posees (requerido) - Debes seleccionar al menos una",
      certificationDocumentsTitle: "Documentos de Certificaciones",
      certificationDocumentsDescription: "Sube los PDFs de las certificaciones seleccionadas (requerido, máximo 10MB por archivo)",
      importerDocuments: "Documentos de Importador",
      requiredDocuments: "Documentos requeridos para importadores - Los campos marcados con * son obligatorios",
      rut: "RUT (NIT)",
      rutNumber: "Número RUT/NIT",
      rutPlaceholder: "Ej: 900123456-7",
      rutDocument: "Documento RUT (PDF)",
      chamberOfCommerce: "Cámara de Comercio",
      chamberOfCommerceDocument: "Certificado Cámara de Comercio (PDF)",
      chamberOfCommerceValidation: "Debe ser expedido en los últimos 30 días",
      legalRepresentative: "Cédula Representante Legal",
      legalRepresentativeDocument: "Documento de Identidad (PDF)",
      nextDocuments: "Siguiente: Documentos",
      previous: "Anterior",
      creatingAccount: "Creando cuenta...",
      createImporterAccount: "Crear Cuenta de Importador",
      createAgentAccount: "Crear Cuenta de Agente",
      alreadyHaveAccount: "¿Ya tienes cuenta? Inicia sesión"
    },
    form: {
      personalInfo: "Información Personal",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      phone: "Teléfono",
      phonePlaceholder: "+1234567890",
      language: "Idioma",
      spanish: "Español",
      english: "English",
      credentials: "Credenciales",
      password: "Contraseña",
      passwordPlaceholder: "Mínimo 6 caracteres",
      confirmPassword: "Confirmar Contraseña",
      confirmPasswordPlaceholder: "Repite tu contraseña",
      company: "Empresa",
      createNewCompany: "Crear nueva empresa",
      companyName: "Nombre de la Empresa",
      companyNamePlaceholder: "Nombre de tu empresa",
      existingCompany: "Empresa Existente",
      selectCompany: "Selecciona una empresa",
      markets: "Mercados",
      marketsDescription: "Selecciona los mercados desde donde importas habitualmente",
      marketsAgentDescription: "Solo recibirás notificaciones de los mercados seleccionados"
    }
  }
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en'); // Inglés por defecto

  const setLanguage = (lang: 'en' | 'es') => {
    setCurrentLanguage(lang);
  };

  const t = (key: string, variables?: Record<string, string | number>): TranslationValue => {
    const keys = key.split('.');
    let value: unknown = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    if (value === undefined) {
      console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`);
      return key;
    }
    
    if (typeof value === 'string' && variables) {
      return Object.entries(variables).reduce(
        (str, [varKey, varValue]) => str.replace(new RegExp(`{{${varKey}}}`, 'g'), String(varValue)),
        value
      );
    }
    
    return value as TranslationValue;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 