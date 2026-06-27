'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { usePathname } from 'next/navigation'

const TITRES: Record<string, string> = {
  '/dashboard': 'Tableau de bord',
  '/catalogue': 'Catalogue produits',
  '/fournisseurs': 'Annuaire fournisseurs',
  '/demandes': 'Demandes de devis (RFQ)',
  '/commandes': 'Mes commandes',
  '/logistique': 'Logistique & Calcul de coûts',
  '/messagerie': 'Messagerie',
  '/agents': 'Agents terrain en Chine',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const path = usePathname()

  const titre = Object.entries(TITRES).find(([k]) => path === k || path.startsWith(k + '/'))?.[1] ?? ''

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-gray-100)', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header titre={titre} onMenuToggle={() => setMobileOpen(true)} />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
