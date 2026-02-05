import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LOGISTICS Empresarial SAC - Sistema de Gestión de Inventarios',
  description: 'Sistema integral de gestión de inventarios y despachos para empresas logísticas. Gestiona productos, stock, ingresos de mercancía, despachos y reportes en tiempo real.',
  generator: 'v0.app',
  keywords: 'logística, inventarios, despachos, gestión de almacén, Perú',
  authors: [{ name: 'LOGISTICS Empresarial SAC' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
