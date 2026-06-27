'use client'
import Link from 'next/link'
import { DEMANDES_RFQ } from '@/lib/data'

const STATUT_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending:     { bg: '#fffbeb', color: '#d97706', label: 'En attente' },
  responded:   { bg: '#f0fdf4', color: '#10b981', label: 'Réponses reçues' },
  negotiating: { bg: '#eff6ff', color: 'var(--color-primary)', label: 'Négociation' },
  ordered:     { bg: '#f9fafb', color: '#374151', label: 'Commande passée' },
}

export default function DemandesPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Demandes de devis (RFQ) 📋</h1>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Gérez vos appels d'offres et comparez les propositions des fournisseurs</p>
        </div>
        <Link href="/demandes/nouvelle"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
          + Nouvelle demande
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total demandes', value: DEMANDES_RFQ.length, icon: '📋', color: '#2a85ff' },
          { label: 'En attente', value: DEMANDES_RFQ.filter(d => d.statutCode === 'pending').length, icon: '⏳', color: '#f59e0b' },
          { label: 'Réponses reçues', value: DEMANDES_RFQ.filter(d => d.statutCode === 'responded').length, icon: '📩', color: '#10b981' },
          { label: 'En négociation', value: DEMANDES_RFQ.filter(d => d.statutCode === 'negotiating').length, icon: '🤝', color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: 10, padding: '14px 16px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)', borderRadius: 12, padding: '16px 20px', border: '1px solid #bfdbfe', marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e40af', marginBottom: 8 }}>💡 Comment fonctionne le RFQ ?</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { n: '1', t: 'Créez votre demande avec quantité et specs' },
            { n: '2', t: 'China-HT la diffuse à 5-15 fournisseurs ciblés' },
            { n: '3', t: 'Recevez et comparez les devis en 48-72h' },
            { n: '4', t: 'Choisissez et passez commande en un clic' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#1e40af' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
              {s.t}
            </div>
          ))}
        </div>
      </div>

      {/* RFQ List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {DEMANDES_RFQ.map(d => {
          const style = STATUT_STYLES[d.statutCode] ?? STATUT_STYLES.pending
          const pct = Math.round((d.reponsesRecues / d.fournisseursContactes) * 100)
          return (
            <div key={d.id} style={{ background: 'white', borderRadius: 12, border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
              {d.urgent && <div style={{ background: '#fee2e2', padding: '6px 20px', fontSize: 12, color: '#dc2626', fontWeight: 700 }}>🔴 URGENT — Traitement prioritaire</div>}
              <div style={{ padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{d.id}</span>
                      <span style={{ fontSize: 11, background: style.bg, color: style.color, padding: '2px 10px', borderRadius: 99, fontWeight: 700 }}>{style.label}</span>
                      <span style={{ fontSize: 11, background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: 4 }}>{d.categorie}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{d.titre}</h3>
                    <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 12px', lineHeight: 1.5 }}>{d.description}</p>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, color: '#6b7280' }}>
                      <span>📦 Quantité : <strong style={{ color: '#111827' }}>{d.quantite}</strong></span>
                      <span>💰 Budget : <strong style={{ color: '#111827' }}>${d.budgetUSD.toLocaleString()}</strong></span>
                      <span>📍 Destination : <strong style={{ color: '#111827' }}>{d.destination}</strong></span>
                      <span>🚢 Incoterm : <strong style={{ color: '#111827' }}>{d.incoterm}</strong></span>
                      <span>📅 Expire : <strong style={{ color: '#111827' }}>{d.dateExpiration}</strong></span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 160 }}>
                    {d.meilleureOffre && (
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Meilleure offre</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981' }}>
                          ${typeof d.meilleureOffre === 'number' && d.meilleureOffre < 100 ? d.meilleureOffre.toFixed(2) + '/u' : d.meilleureOffre.toLocaleString()}
                        </div>
                      </div>
                    )}
                    <button style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 6 }}>
                      Voir les devis →
                    </button>
                    <Link href="/demandes/nouvelle"
                      style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}>
                      Modifier
                    </Link>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>
                      <strong style={{ color: '#111827' }}>{d.reponsesRecues}</strong> réponses sur <strong style={{ color: '#111827' }}>{d.fournisseursContactes}</strong> fournisseurs contactés
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: pct >= 70 ? '#10b981' : '#f59e0b' }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: pct >= 70 ? '#10b981' : '#f59e0b', borderRadius: 99, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA nouvelle demande */}
      <div style={{ marginTop: 20, background: 'white', borderRadius: 12, padding: '24px', border: '2px dashed #e5e7eb', textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>➕</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Créer une nouvelle demande de devis</div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>Comparez les prix de plusieurs fournisseurs en une seule demande</div>
        <Link href="/demandes/nouvelle"
          style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 22px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
          Nouvelle demande RFQ →
        </Link>
      </div>
    </div>
  )
}
