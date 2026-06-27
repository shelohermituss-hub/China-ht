'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Tableau de bord', icone: '📊' },
  { href: '/catalogue', label: 'Catalogue produits', icone: '🛍️' },
  { href: '/fournisseurs', label: 'Fournisseurs', icone: '🏭' },
  { href: '/demandes', label: 'Demandes de devis', icone: '📝', badge: 3 },
  { href: '/commandes', label: 'Mes commandes', icone: '📦', badge: 1 },
  { href: '/logistique', label: 'Logistique & Calcul', icone: '🚢' },
  { href: '/messagerie', label: 'Messagerie', icone: '💬', badge: 3 },
  { href: '/agents', label: 'Agents en Chine', icone: '🤝' },
]

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const path = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 39 }} onClick={onClose} />}

      <aside style={{
        width: 240,
        background: 'white',
        borderRight: '1px solid var(--color-gray-200)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 40,
        transform: mobileOpen === false ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.2s ease',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--color-gray-100)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #003087, #e63946)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🌏</span>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--color-gray-900)', lineHeight: 1 }}>China-HT</div>
              <div style={{ fontSize: 10, color: 'var(--color-gray-400)', fontWeight: 500 }}>Sourcing Haïti ↔ Chine</div>
            </div>
          </div>
          {/* Haiti-China flag bar */}
          <div style={{ height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #003087 50%, #D21034 50%)', marginTop: 14 }} />
        </div>

        {/* Navigation */}
        <nav style={{ padding: '12px 12px', flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: 6 }}>
            Menu principal
          </div>
          {NAV.map(item => {
            const active = path === item.href || path.startsWith(item.href + '/')
            return (
              <Link key={item.href} href={item.href} onClick={onClose} style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                <div className={`sidebar-link ${active ? 'active' : ''}`}>
                  <span style={{ fontSize: 16 }}>{item.icone}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ background: active ? 'var(--color-primary)' : 'var(--color-error)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 99 }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom user card */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-gray-100)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #003087, #e63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>JD</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Jean Dupont</div>
            <div style={{ fontSize: 11, color: 'var(--color-gray-400)' }}>Port-au-Prince, Haïti</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 14, cursor: 'pointer', color: 'var(--color-gray-400)' }}>⚙️</div>
        </div>
      </aside>
    </>
  )
}
