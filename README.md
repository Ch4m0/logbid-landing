# LogBid Landing Page

Una moderna landing page para LogBid, logística internacional que conecta importadores con agentes logísticos verificados.

## 🚀 Características

- **Modern UI**: Diseño moderno con gradientes y animaciones
- **Responsive**: Completamente responsive para todos los dispositivos
- **Next.js 15**: Construido con la última versión de Next.js
- **TypeScript**: Totalmente tipado con TypeScript
- **Tailwind CSS**: Estilado con Tailwind CSS v4
- **Componentes Modulares**: Componentes UI reutilizables
- **Iconos**: Usa Lucide React para iconos modernos

## 🛠️ Tecnologías

- [Next.js 15](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS v4](https://tailwindcss.com/) - Framework de CSS
- [Lucide React](https://lucide.dev/) - Iconos
- [React 19](https://reactjs.org/) - Biblioteca de UI

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd logbid-landing
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
└── components/
    └── ui/                  # Componentes UI
        ├── badge.tsx
        ├── button.tsx
        └── card.tsx
```

## 🎨 Componentes UI

El proyecto incluye componentes UI personalizados que mantienen consistencia de diseño:

- **Button**: Botón con múltiples variantes (default, outline, ghost)
- **Card**: Contenedor de contenido con CardContent
- **Badge**: Etiquetas para mostrar información adicional

## 🔧 Arreglos Realizados

- ✅ Instalación de `lucide-react` para iconos
- ✅ Creación de componentes UI faltantes
- ✅ Configuración correcta de TypeScript paths
- ✅ Escapado de caracteres especiales en JSX
- ✅ Limpieza de imports no utilizados
- ✅ Configuración de fuentes del sistema
- ✅ Animaciones CSS personalizadas
- ✅ Build exitoso sin errores

## 🚀 Deployment

El proyecto está listo para deployment en plataformas como:

- [Vercel](https://vercel.com/) (recomendado)
- [Netlify](https://netlify.com/)
- [Railway](https://railway.app/)

## 📝 Licencia

Este proyecto es parte del portfolio de desarrollo.
