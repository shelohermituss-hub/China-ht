'use client'
import { use } from 'react'
import Link from 'next/link'
import { FOURNISSEURS } from '@/lib/data'

export default function FournisseurDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const f = FOURNISSEURS.find(x => x.id === id)

  if (!f) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🏭</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>Fournisseur introuvable</div>
      <Link href="/fournisseurs" style={{ display: 'inline-block', marginTop: 16, color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>← Retour à l'annuaire</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
        <Link href="/fournisseurs" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Fournisseurs</Link>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#111827', fontWeight: 600 }}>{f.nom}</span>
      </div>

      {/* Hero card */}
      <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #e5e7eb', overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ height: 5, background: `linear-gradient(90deg, ${f.couleur}, ${f.couleur}80)` }} />
        <div style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: f.couleur + '20', color: f.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, border: `2px solid ${f.couleur}40`, flexShrink: 0 }}>{f.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: 0 }}>{f.nom}</h1>
                {f.verifie && <span style={{ fontSize: 12, background: '#f0fdf4', color: '#059669', padding: '3px 10px', borderRadius: 99, fontWeight: 700 }}>✓ Vérifié SGS</span>}
                {f.badgeOr && <span style={{ fontSize: 12, background: '#fffbeb', color: '#d97706', padding: '3px 10px', borderRadius: 99, fontWeight: 700 }}>⭐ Badge Or</span>}
              </div>
              <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 10 }}>
                {f.nomZH} · 📍 {f.ville}, Chine · {f.employes} employés · Fondée en {f.anneeCreation}
              </div>
              <p style={{ fontSize: 14, color: '#4b5563', margin: '0 0 14px', lineHeight: 1.6, maxWidth: 620 }}>{f.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {f.categories.map(c => <span key={c} style={{ fontSize: 12, background: f.couleur + '15', color: f.couleur, padding: '3px 10px', borderRadius: 5, fontWeight: 600 }}>{c}</span>)}
              </div>
            </div>
            {/* Score panel */}
            <div style={{ background: '#fafafa', borderRadius: 12, padding: '18px 22px', textAlign: 'center', flexShrink: 0, border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#111827' }}>{f.note}</div>
              <div style={{ color: '#f59e0b', fontSize: 16, margin: '2px 0 4px' }}>{'★'.repeat(Math.floor(f.note))}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{f.avis} avis</div>
              <div style={{ height: 1, background: '#e5e7eb', margin: '12px 0' }} />
              <div style={{ fontSize: 20, fontWeight: 800, color: '#e63946' }}>{f.commandesHaiti}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>cmds Haïti</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { icon: '📦', label: 'MOQ minimum', value: `${f.moqMin} unités` },
              { icon: '⏱️', label: 'Délai fabrication', value: f.delaiFabrication },
              { icon: '📲', label: 'Taux de réponse', value: `${f.tauxRepondre}%` },
            ].map(s => (
              <div key={s.label} style={{ background: 'white', borderRadius: 10, padding: '14px 16px', border: '1px solid #e5e7eb' }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginTop: 6 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>🛡️ Certifications</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {f.certifications.map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '6px 12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13, color: '#065f46', fontWeight: 600 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>⭐ Produits phares</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {f.produitsStar.map((p, i) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: i % 2 === 0 ? '#fafafa' : 'white', borderRadius: 8, border: '1px solid #f3f4f6' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: f.couleur + '20', color: f.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Incoterms & Payment */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>🚢 Incoterms</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {f.incoterms.map(t => <span key={t} style={{ fontSize: 13, background: '#eff6ff', color: 'var(--color-primary)', padding: '4px 10px', borderRadius: 6, fontWeight: 700 }}>{t}</span>)}
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>💳 Paiements acceptés</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {f.paiements.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#374151' }}>
                    <span style={{ color: '#10b981' }}>✓</span> {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>🗣️ Langues de communication</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {f.langues.map(l => (
                <span key={l} style={{ fontSize: 13, background: '#f9fafb', border: '1.5px solid #e5e7eb', padding: '5px 12px', borderRadius: 8, color: '#374151', fontWeight: 500 }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Contact form */}
          <div style={{ background: 'white', borderRadius: 12, padding: '20px', border: '1.5px solid var(--color-primary)', position: 'sticky', top: 88 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>📩 Contacter ce fournisseur</h3>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Votre besoin</label>
              <textarea placeholder="Décrivez votre produit, quantité, délais..."
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', resize: 'vertical', minHeight: 90, boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Quantité souhaitée</label>
              <input placeholder={`Min. ${f.moqMin} unités`}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button style={{ width: '100%', padding: '11px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
              Envoyer ma demande →
            </button>
            <button style={{ width: '100%', padding: '11px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              💬 Message direct
            </button>
            <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', margin: '10px 0 0' }}>
              Réponse sous {f.tauxRepondre >= 97 ? '24h' : '48h'} · {f.tauxRepondre}% de taux de réponse
            </p>
          </div>

          {/* Port info */}
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '16px', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#065f46', marginBottom: 8 }}>🚢 Logistique depuis {f.ville}</div>
            <div style={{ fontSize: 13, color: '#047857' }}>
              Délai estimé Port-au-Prince : <strong>35–45 jours</strong>
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>
              Incoterms disponibles : {f.incoterms.join(', ')}
            </div>
          </div>

          {/* Safety badge */}
          <div style={{ background: 'linear-gradient(135deg, #001f5b, #003087)', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 6 }}>🛡️ Achat sécurisé China-HT</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              <li>Fournisseur inspecté par notre équipe</li>
              <li>SGS verification {f.anneeCreation === 2005 ? '20 ans' : `depuis ${f.anneeCreation}`}</li>
              <li>Trade Assurance disponible</li>
              <li>Agent terrain disponible à {f.ville}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
