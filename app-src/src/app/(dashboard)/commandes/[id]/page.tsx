'use client'
import { use } from 'react'
import Link from 'next/link'
import { COMMANDES, formatUSD, USD_TO_HTG } from '@/lib/data'

export default function CommandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const cmd = COMMANDES.find(c => c.id === id)

  if (!cmd) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>Commande introuvable</div>
      <Link href="/commandes" style={{ display: 'inline-block', marginTop: 16, color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>← Retour aux commandes</Link>
    </div>
  )

  const etapesFaites = cmd.tracking.filter(t => t.fait).length
  const pct = Math.round((etapesFaites / cmd.tracking.length) * 100)
  const montantHTG = cmd.montantUSD * USD_TO_HTG
  const taxesUSD = cmd.montantUSD * (cmd.taxes.total / 100)

  const STATUT_COLOR: Record<string, string> = {
    transit: '#2a85ff', production: '#f59e0b', delivered: '#10b981', customs: '#8b5cf6'
  }
  const color = STATUT_COLOR[cmd.statutCode] ?? '#6b7280'

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
        <Link href="/commandes" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Commandes</Link>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#111827', fontWeight: 600, fontFamily: 'monospace' }}>{cmd.id}</span>
      </div>

      {/* Header */}
      <div style={{ background: 'white', borderRadius: 14, border: '1.5px solid #e5e7eb', overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ height: 4, background: color }} />
        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#9ca3af', background: '#f3f4f6', padding: '2px 8px', borderRadius: 4 }}>{cmd.id}</span>
                <span style={{ fontSize: 12, background: color + '15', color, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>{cmd.statut}</span>
              </div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '0 0 6px', lineHeight: 1.3 }}>{cmd.produit}</h1>
              <div style={{ fontSize: 13, color: '#6b7280' }}>
                Fournisseur : <Link href={`/fournisseurs/${cmd.fournisseurId}`} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>{cmd.fournisseur}</Link>
                {' '}· Commande du {cmd.dateCommande}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#111827' }}>{formatUSD(cmd.montantUSD)}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{Math.round(montantHTG).toLocaleString('fr-HT')} HTG</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Main - Tracking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Progress */}
          <div style={{ background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>🌊 Suivi du transport</h2>
              <span style={{ fontSize: 18, fontWeight: 800, color }}{...{}}>{pct}% terminé</span>
            </div>
            <div style={{ height: 8, background: '#f3f4f6', borderRadius: 99, marginBottom: 20, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}bb)`, borderRadius: 99, transition: 'width 1s ease' }} />
            </div>

            {/* Route */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22 }}>🇨🇳</div>
                <div style={{ fontSize: 11, color: '#374151', fontWeight: 600, marginTop: 4 }}>{cmd.portDepart}</div>
              </div>
              <div style={{ flex: 1, position: 'relative', height: 3, background: '#e5e7eb', borderRadius: 99 }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: color, borderRadius: 99 }} />
                {pct < 100 && (
                  <div style={{ position: 'absolute', left: `${Math.min(pct, 92)}%`, top: '50%', transform: 'translate(-50%, -50%)', fontSize: 18, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🚢</div>
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22 }}>🇭🇹</div>
                <div style={{ fontSize: 11, color: '#374151', fontWeight: 600, marginTop: 4 }}>{cmd.portArrivee}</div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {cmd.tracking.map((t, i) => {
                const isLast = i === cmd.tracking.length - 1
                const isCurrent = t.fait && (i === cmd.tracking.length - 1 || !cmd.tracking[i + 1].fait)
                return (
                  <div key={i} style={{ display: 'flex', gap: 14 }}>
                    {/* Line & dot */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
                      <div style={{ width: isCurrent ? 16 : 12, height: isCurrent ? 16 : 12, borderRadius: '50%', background: t.fait ? (isCurrent ? color : '#10b981') : '#d1d5db', border: isCurrent ? `3px solid ${color}40` : 'none', transition: 'all 0.3s', flexShrink: 0, marginTop: 2 }} />
                      {!isLast && <div style={{ width: 2, flex: 1, background: t.fait ? '#10b981' : '#e5e7eb', minHeight: 32, margin: '4px 0' }} />}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
                      <div style={{ fontSize: 14, fontWeight: isCurrent ? 700 : t.fait ? 600 : 400, color: t.fait ? '#111827' : '#9ca3af' }}>{t.evenement}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 3, fontSize: 12, color: '#9ca3af' }}>
                        <span>📍 {t.lieu}</span>
                        <span>📅 {t.date}</span>
                        {!t.fait && <span style={{ color: '#f59e0b' }}>Prévu</span>}
                        {isCurrent && <span style={{ color, fontWeight: 700 }}>← Étape actuelle</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Taxes */}
          <div style={{ background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>🏛️ Taxes & Douanes Haïti</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Valeur merchandise (CIF)', value: formatUSD(cmd.montantUSD), highlight: false },
                { label: 'Frais de vérification AGD (5%)', value: formatUSD(cmd.montantUSD * 0.05), highlight: false },
                { label: 'TVA Haïti (10%)', value: formatUSD(cmd.montantUSD * 0.10), highlight: false },
                { label: 'Droit spécial (1%)', value: formatUSD(cmd.montantUSD * 0.01), highlight: false },
                { label: `Total taxes estimé (${cmd.taxes.total}%)`, value: formatUSD(taxesUSD), highlight: true },
                { label: 'Coût total estimé DDP', value: formatUSD(cmd.montantUSD + taxesUSD), highlight: true },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: r.highlight ? '#fafafa' : 'white', borderRadius: 7, border: r.highlight ? '1px solid #e5e7eb' : 'none', fontSize: 13 }}>
                  <span style={{ color: '#6b7280' }}>{r.label}</span>
                  <span style={{ fontWeight: r.highlight ? 800 : 600, color: r.highlight ? '#111827' : '#374151' }}>{r.value}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 10, marginBottom: 0 }}>* Estimatif — les taxes réelles peuvent varier selon la classification douanière finale</p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Details */}
          <div style={{ background: 'white', borderRadius: 12, padding: '18px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>📋 Détails de la commande</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Conteneur', value: cmd.conteneur },
                { label: 'Poids', value: cmd.poids },
                { label: 'Volume', value: cmd.volume },
                { label: 'Incoterm', value: cmd.incoterm },
                { label: 'Port départ', value: cmd.portDepart },
                { label: 'Port arrivée', value: cmd.portArrivee },
                { label: 'Date départ', value: cmd.dateDepart ?? 'À confirmer' },
                { label: 'Livraison prévue', value: cmd.dateLivraisonEstimee ?? 'À confirmer' },
              ].map(d => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingBottom: 8, borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280' }}>{d.label}</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{d.value}</span>
                </div>
              ))}
              {cmd.bl && (
                <div style={{ marginTop: 4 }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 3 }}>Numéro B/L</div>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', background: '#f9fafb', padding: '6px 10px', borderRadius: 6, color: '#111827', fontWeight: 600, wordBreak: 'break-all' }}>{cmd.bl}</div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ background: 'white', borderRadius: 12, padding: '18px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>⚡ Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{ padding: '10px 14px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                💬 Contacter le fournisseur
              </button>
              <button style={{ padding: '10px 14px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                📄 Télécharger documents
              </button>
              <Link href="/logistique"
                style={{ display: 'block', padding: '10px 14px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
                🧮 Recalculer coûts fret
              </Link>
              <Link href="/agents"
                style={{ display: 'block', padding: '10px 14px', background: '#f9fafb', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
                👤 Contacter agent terrain
              </Link>
            </div>
          </div>

          {/* Help */}
          <div style={{ background: 'linear-gradient(135deg, #001f5b, #003087)', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 8 }}>🛡️ Besoin d'aide ?</div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 12, lineHeight: 1.5 }}>Notre équipe peut vous aider avec le dédouanement, la gestion des documents et la livraison finale.</p>
            <button style={{ width: '100%', padding: '9px', background: '#e63946', color: 'white', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Contacter le support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
