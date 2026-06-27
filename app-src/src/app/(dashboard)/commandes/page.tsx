'use client'
import Link from 'next/link'
import { COMMANDES, formatUSD } from '@/lib/data'

const STATUT: Record<string, { bg: string; color: string; dot: string; label: string }> = {
  transit:    { bg: '#eff6ff', color: 'var(--color-primary)', dot: '#2a85ff', label: '🚢 En transit' },
  production: { bg: '#fffbeb', color: '#d97706', dot: '#f59e0b', label: '🔧 Production' },
  delivered:  { bg: '#f0fdf4', color: '#059669', dot: '#10b981', label: '✅ Livré' },
  customs:    { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b', label: '🏛️ Dédouanement' },
}

export default function CommandesPage() {
  const totalUSD = COMMANDES.reduce((s, c) => s + c.montantUSD, 0)
  const enCours = COMMANDES.filter(c => c.statutCode !== 'delivered').length
  const livrees = COMMANDES.filter(c => c.statutCode === 'delivered').length

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Mes commandes 📦</h1>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Suivez vos cargaisons en temps réel depuis la Chine jusqu'à Port-au-Prince</p>
        </div>
        <Link href="/demandes/nouvelle"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
          + Nouvelle commande
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Volume total', value: formatUSD(totalUSD), icon: '💰', color: '#2a85ff' },
          { label: 'En cours', value: enCours, icon: '🚢', color: '#f59e0b' },
          { label: 'Livrées', value: livrees, icon: '✅', color: '#10b981' },
          { label: 'Prochaine livraison', value: '10 juil.', icon: '📅', color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: 10, padding: '14px 16px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: typeof s.value === 'string' ? 15 : 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert */}
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <div style={{ flex: 1, fontSize: 13, color: '#92400e' }}>
          <strong>Alerte Port-au-Prince :</strong> Légère congestion signalée — prévoir +3 à +5 jours pour le dédouanement. <span style={{ color: '#d97706', fontWeight: 600 }}>CMD-2026-0047 potentiellement impactée.</span>
        </div>
      </div>

      {/* Orders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {COMMANDES.map(cmd => {
          const s = STATUT[cmd.statutCode] ?? STATUT.transit
          const etapesFaites = cmd.tracking.filter(t => t.fait).length
          const pct = Math.round((etapesFaites / cmd.tracking.length) * 100)

          return (
            <div key={cmd.id} style={{ background: 'white', borderRadius: 14, border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
              {/* Header bar */}
              <div style={{ background: s.bg, borderBottom: '1px solid #e5e7eb', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#9ca3af', fontWeight: 600 }}>{cmd.id}</span>
                  <span style={{ fontSize: 12, background: s.bg, color: s.color, fontWeight: 700, border: `1px solid ${s.color}30`, padding: '2px 10px', borderRadius: 99 }}>{s.label}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href={`/commandes/${cmd.id}`}
                    style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>
                    Voir détails →
                  </Link>
                </div>
              </div>

              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{cmd.produit}</h3>
                    <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
                      {cmd.fournisseur} · {cmd.dateCommande} · <strong style={{ color: '#111827' }}>{formatUSD(cmd.montantUSD)}</strong>
                    </div>

                    {/* Journey */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>🇨🇳 {cmd.portDepart}</div>
                      <div style={{ flex: 1, position: 'relative', height: 4, background: '#e5e7eb', borderRadius: 99 }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${s.dot}, ${s.dot}99)`, borderRadius: 99, transition: 'width 0.8s ease' }} />
                        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)', fontSize: 14 }}>🚢</div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>🇭🇹 {cmd.portArrivee}</div>
                    </div>

                    {/* Mini timeline */}
                    <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
                      {cmd.tracking.map((t, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.fait ? '#10b981' : '#d1d5db', flexShrink: 0 }} />
                            <span style={{ fontSize: 10, color: t.fait ? '#374151' : '#9ca3af', fontWeight: t.fait ? 600 : 400, whiteSpace: 'nowrap' }}>{t.evenement.split(' ').slice(0, 2).join(' ')}</span>
                          </div>
                          {i < cmd.tracking.length - 1 && <div style={{ width: 16, height: 1, background: '#e5e7eb', margin: '0 4px' }} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right info */}
                  <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 160 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#111827', marginBottom: 2 }}>{pct}%</div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 14 }}>Progression</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>Livraison estimée</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{cmd.dateLivraisonEstimee ?? 'À confirmer'}</div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 12, borderTop: '1px solid #f3f4f6', flexWrap: 'wrap', fontSize: 12, color: '#6b7280' }}>
                  <span>📦 {cmd.conteneur}</span>
                  <span>⚖️ {cmd.poids}</span>
                  <span>📐 {cmd.volume}</span>
                  <span>🚢 {cmd.incoterm}</span>
                  {cmd.bl && <span>B/L : <strong style={{ color: '#111827', fontFamily: 'monospace' }}>{cmd.bl}</strong></span>}
                  <span>🏛️ Taxes estimées : <strong style={{ color: '#111827' }}>{cmd.taxes.total}%</strong></span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
