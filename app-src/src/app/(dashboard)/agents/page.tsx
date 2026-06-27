'use client'
import { useState } from 'react'
import { AGENTS } from '@/lib/data'

export default function AgentsPage() {
  const [selectedVille, setSelectedVille] = useState('all')
  const [showDisponibles, setShowDisponibles] = useState(false)

  const agentsFiltres = AGENTS.filter(a => {
    const matchVille = selectedVille === 'all' || a.ville.toLowerCase() === selectedVille.toLowerCase()
    const matchDispo = !showDisponibles || a.disponible
    return matchVille && matchDispo
  })

  const villes = ['all', ...Array.from(new Set(AGENTS.map(a => a.ville)))]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Agents terrain en Chine 🤝</h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Des Haïtiens et alliés basés en Chine pour vous représenter sur le terrain</p>
      </div>

      {/* Why agents banner */}
      <div style={{ background: 'linear-gradient(135deg, #001f5b, #003087)', borderRadius: 14, padding: '24px 28px', marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20 }}>
        {[
          { icon: '🔍', title: 'Visite usine', desc: 'Inspection physique avant commande' },
          { icon: '🤝', title: 'Négociation', desc: 'Obtenir les meilleurs prix en mandarin' },
          { icon: '✅', title: 'Contrôle qualité', desc: 'Vérification avant expédition' },
          { icon: '🗣️', title: 'Créole/Mandarin', desc: 'Communication sans barrière' },
        ].map(s => (
          <div key={s.title} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Agents actifs', value: AGENTS.length, color: '#2a85ff', icon: '👥' },
          { label: 'Disponibles maintenant', value: AGENTS.filter(a => a.disponible).length, color: '#10b981', icon: '🟢' },
          { label: 'Villes couvertes', value: new Set(AGENTS.map(a => a.ville)).size, color: '#8b5cf6', icon: '📍' },
          { label: 'Importateurs aidés', value: '500+', color: '#f59e0b', icon: '🇭🇹' },
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

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {villes.map(v => (
            <button key={v} onClick={() => setSelectedVille(v)}
              style={{ padding: '7px 14px', borderRadius: 99, border: '1.5px solid', borderColor: selectedVille === v ? 'var(--color-primary)' : '#e5e7eb', background: selectedVille === v ? '#eff6ff' : 'white', color: selectedVille === v ? 'var(--color-primary)' : '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {v === 'all' ? '🌏 Toutes les villes' : `📍 ${v}`}
            </button>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#374151', marginLeft: 'auto' }}>
          <input type="checkbox" checked={showDisponibles} onChange={e => setShowDisponibles(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
          Disponibles uniquement
        </label>
      </div>

      {/* Agent cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {agentsFiltres.map(a => (
          <div key={a.id} style={{ background: 'white', borderRadius: 14, border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ height: 4, background: a.couleur }} />
            <div style={{ padding: '22px' }}>
              {/* Header */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: a.couleur + '20', color: a.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, border: `2px solid ${a.couleur}40`, flexShrink: 0 }}>{a.avatar}</div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderRadius: '50%', background: a.disponible ? '#10b981' : '#9ca3af', border: '2px solid white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', margin: 0 }}>{a.nom}</h3>
                    {!a.disponible && <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '1px 8px', borderRadius: 99 }}>Indisponible</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                    📍 {a.ville} · {a.nationalite} · {a.experience} ans d&apos;expérience
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#f59e0b', fontSize: 13 }}>★</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>{a.note}</span>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>({a.avis} avis)</span>
                  </div>
                </div>
                {/* Pricing */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>Visite fournisseur</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>${a.tarifVisite}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Journée complète</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>${a.tarifJour}/j</div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: 13, color: '#4b5563', margin: '0 0 14px', lineHeight: 1.6 }}>{a.description}</p>

              {/* Specialites */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spécialités</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {a.specialites.map(s => <span key={s} style={{ fontSize: 11, background: a.couleur + '15', color: a.couleur, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{s}</span>)}
                </div>
              </div>

              {/* Services */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services proposés</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  {a.services.slice(0, 4).map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#374151' }}>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {a.langues.map(l => (
                    <span key={l} style={{ fontSize: 11, background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: 4, border: '1px solid #e5e7eb' }}>🗣️ {l}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button disabled={!a.disponible}
                  style={{ flex: 2, padding: '10px', background: a.disponible ? 'var(--color-primary)' : '#e5e7eb', color: a.disponible ? 'white' : '#9ca3af', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: a.disponible ? 'pointer' : 'not-allowed' }}>
                  {a.disponible ? '📩 Contacter cet agent' : 'Indisponible'}
                </button>
                <button style={{ flex: 1, padding: '10px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Voir profil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Become agent CTA */}
      <div style={{ marginTop: 24, background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', borderRadius: 12, padding: '22px 28px', border: '1.5px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 36 }}>🌟</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#065f46', marginBottom: 4 }}>Vous êtes Haïtien basé en Chine ?</div>
          <div style={{ fontSize: 13, color: '#047857' }}>Rejoignez notre réseau d'agents terrain et aidez les importateurs haïtiens. Revenus complémentaires, réseau professionnel, mission communautaire.</div>
        </div>
        <button style={{ padding: '11px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
          Devenir agent →
        </button>
      </div>

      {/* How it works */}
      <div style={{ marginTop: 20, background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>📋 Comment ça marche ?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { n: '1', title: 'Choisissez un agent', desc: 'Selon la ville et votre catégorie de produits' },
            { n: '2', title: 'Briefez votre mission', desc: 'Partagez vos specs, fournisseurs cibles, budget' },
            { n: '3', title: 'L\'agent agit', desc: 'Visite, négocie, inspecte en votre nom' },
            { n: '4', title: 'Recevez le rapport', desc: 'Photos, vidéos, devis, recommandations' },
          ].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, margin: '0 auto 10px' }}>{s.n}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
