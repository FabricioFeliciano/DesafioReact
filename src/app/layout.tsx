"use client";
import '../assets/style/bundle.scss'
import type { Metadata } from 'next'

//Componentes Layout
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'Desafio'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
