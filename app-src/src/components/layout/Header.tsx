'use client'
import { useState } from 'react'
import { USD_TO_HTG } from '@/lib/data'

export default function Header({ titre, onMenuToggle }: { titre?: string; onMenuToggle?: () => void }) {
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header style={{
      height: 60,
      background: 'white',
      borderBottom: '1px solid var(--color-gray-200)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      {/* Mobile menu button */}
      <button onClick={onMenuToggle} style={{ display: 'none', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 4 }} className="mobile-menu-btn">
        ☰
      </button>

      {/* Page title */}
      {titre && <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-gray-900)', margin: 0 }}>{titre}</h1>}

      <div style={{ flex: 1 }} />

      {/* Exchange rate badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-success-subtle)', padding: '4px 12px', borderRadius: 8, cursor: 'default' }}>
        <span style={{ fontSize: 11 }}>💱</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-success)' }}>
          1 USD = {USD_TO_HTG.toFixed(2)} HTG
        </span>
        <span style={{ fontSize: 10, color: 'var(--color-gray-400)' }}>BRH</span>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span style={{ position: 'absolute', left: 10, color: 'var(--color-gray-400)', fontSize: 14 }}>🔍</span>
        <input
          placeholder="Chercher produit, fournisseur..."
          style={{ padding: '7px 12px 7px 32px', border: '1.5px solid var(--color-gray-200)', borderRadius: 8, fontSize: 13, width: 220, color: 'var(--color-gray-700)', outline: 'none', background: 'var(--color-gray-50)' }}
        />
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => setNotifOpen(!notifOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 4, fontSize: 18 }}>
          🔔
          <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: 'var(--color-error)', borderRadius: '50%', border: '1.5px solid white' }} />
        </button>
        {notifOpen && (
          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 8, width: 320, background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-dropdown)', border: '1px solid var(--color-gray-200)', zIndex: 100 }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-gray-100)', fontWeight: 700, fontSize: 14 }}>Notifications</div>
            {[
              { icone: '🚢', texte: 'Commande CMD-2026-0047 en transit vers Port-au-Prince', temps: 'Il y a 2h', couleur: '#2a85ff' },
              { icone: '✅', texte: 'Commande CMD-2026-0038 livrée avec succès!', temps: 'Hier', couleur: '#10b981' },
              { icone: '💬', texte: 'Nouveau message de Guangdong SunTex', temps: 'Il y a 3h', couleur: '#8b5cf6' },
              { icone: '⚠️', texte: 'Alerte congestion Port-au-Prince — délai +3 jours', temps: 'Il y a 5h', couleur: '#f59e0b' },
            ].map((n, i) => (
              <div key={i} style={{ padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', borderBottom: '1px solid var(--color-gray-50)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-gray-50)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                <span style={{ fontSize: 18 }}>{n.icone}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--color-gray-700)', lineHeight: 1.4 }}>{n.texte}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--color-gray-400)' }}>{n.temps}</p>
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 16px', textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}>Tout marquer comme lu</span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
