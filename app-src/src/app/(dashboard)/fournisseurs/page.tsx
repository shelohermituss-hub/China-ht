'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FOURNISSEURS, VILLES_CHINE, CATEGORIES } from '@/lib/data'

export default function FournisseursPage() {
  const [search, setSearch] = useState('')
  const [selectedVille, setSelectedVille] = useState('all')
  const [selectedCat, setSelectedCat] = useState('all')
  const [sortBy, setSortBy] = useState('note')

  const filtres = FOURNISSEURS.filter(f => {
    const matchSearch = !search || f.nom.toLowerCase().includes(search.toLowerCase()) || f.specialite.toLowerCase().includes(search.toLowerCase())
    const matchVille = selectedVille === 'all' || f.ville.toLowerCase() === selectedVille.toLowerCase()
    const matchCat = selectedCat === 'all' || f.categories.some(c => c.toLowerCase().includes(selectedCat.toLowerCase()))
    return matchSearch && matchVille && matchCat
  }).sort((a, b) => {
    if (sortBy === 'note') return b.note - a.note
    if (sortBy === 'avis') return b.avis - a.avis
    if (sortBy === 'haiti') return b.commandesHaiti - a.commandesHaiti
    return 0
  })

  const statuts = [
    { label: 'Tous les fournisseurs', value: 'all', count: FOURNISSEURS.length },
    { label: 'Vérifiés SGS', value: 'verifie', count: FOURNISSEURS.filter(f => f.verifie).length },
    { label: 'Badge Or', value: 'or', count: FOURNISSEURS.filter(f => f.badgeOr).length },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Annuaire fournisseurs 🏭</h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>6 fournisseurs vérifiés — filtrés et validés pour les importateurs haïtiens</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Fournisseurs vérifiés', value: '6', icon: '✅', color: '#10b981' },
          { label: 'Inspections SGS', value: '6/6', icon: '🛡️', color: '#2a85ff' },
          { label: 'Langues parlées', value: '6+', icon: '🗣️', color: '#8b5cf6' },
          { label: 'Cmds Haïti totales', value: '290+', icon: '🇭🇹', color: '#e63946' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: 10, padding: '14px 16px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20 }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: '0 0 10px' }}>🔍 Rechercher</h3>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Nom, spécialité..."
              style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: '0 0 10px' }}>🇨🇳 Ville</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[{ id: 'all', nom: 'Toutes les villes' }, ...VILLES_CHINE].map(v => (
                <button key={v.id} onClick={() => setSelectedVille(v.id)}
                  style={{ textAlign: 'left', padding: '7px 10px', borderRadius: 7, border: 'none', background: selectedVille === v.id ? '#eff6ff' : 'transparent', color: selectedVille === v.id ? 'var(--color-primary)' : '#374151', fontSize: 13, fontWeight: selectedVille === v.id ? 600 : 400, cursor: 'pointer' }}>
                  {v.nom}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: '0 0 10px' }}>📦 Catégorie</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button onClick={() => setSelectedCat('all')}
                style={{ textAlign: 'left', padding: '7px 10px', borderRadius: 7, border: 'none', background: selectedCat === 'all' ? '#eff6ff' : 'transparent', color: selectedCat === 'all' ? 'var(--color-primary)' : '#374151', fontSize: 13, fontWeight: selectedCat === 'all' ? 600 : 400, cursor: 'pointer' }}>
                Toutes catégories
              </button>
              {CATEGORIES.slice(0, 6).map(c => (
                <button key={c.id} onClick={() => setSelectedCat(c.id)}
                  style={{ textAlign: 'left', padding: '7px 10px', borderRadius: 7, border: 'none', background: selectedCat === c.id ? '#eff6ff' : 'transparent', color: selectedCat === c.id ? 'var(--color-primary)' : '#374151', fontSize: 13, fontWeight: selectedCat === c.id ? 600 : 400, cursor: 'pointer' }}>
                  {c.icone} {c.nom.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {statuts.map(s => (
                <span key={s.value} style={{ fontSize: 12, background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: 99, fontWeight: 500 }}>
                  {s.label} <strong>{s.count}</strong>
                </span>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ padding: '7px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', background: 'white' }}>
              <option value="note">Note (↓)</option>
              <option value="avis">Nombre d'avis (↓)</option>
              <option value="haiti">Cmds Haïti (↓)</option>
            </select>
          </div>

          {filtres.length === 0 ? (
            <div style={{ background: 'white', borderRadius: 12, padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Aucun fournisseur trouvé</div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Modifiez vos filtres</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtres.map(f => (
                <div key={f.id} style={{ background: 'white', borderRadius: 12, border: '1.5px solid #e5e7eb', overflow: 'hidden' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(42,133,255,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  {/* Top colored strip */}
                  <div style={{ height: 3, background: f.couleur }} />
                  <div style={{ padding: '20px 22px' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      {/* Avatar */}
                      <div style={{ width: 56, height: 56, borderRadius: 14, background: f.couleur + '20', color: f.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 17, flexShrink: 0, border: `2px solid ${f.couleur}30` }}>{f.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#111827', margin: 0 }}>{f.nom}</h3>
                          {f.verifie && <span style={{ fontSize: 11, background: '#f0fdf4', color: '#059669', padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>✓ SGS Vérifié</span>}
                          {f.badgeOr && <span style={{ fontSize: 11, background: '#fffbeb', color: '#d97706', padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>⭐ Badge Or</span>}
                        </div>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
                          {f.nomZH} · 📍 {f.ville}, Chine · Fondée en {f.anneeCreation} · {f.employes} employés
                        </div>
                        <p style={{ fontSize: 13, color: '#4b5563', margin: '0 0 10px', lineHeight: 1.5 }}>{f.specialite}</p>

                        {/* Categories */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                          {f.categories.map(c => <span key={c} style={{ fontSize: 11, background: f.couleur + '15', color: f.couleur, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{c}</span>)}
                        </div>

                        {/* Certifications */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {f.certifications.map(c => <span key={c} style={{ fontSize: 11, background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: 4 }}>{c}</span>)}
                        </div>
                      </div>

                      {/* Right stats */}
                      <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 120 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginBottom: 2 }}>
                          <span style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
                          <span style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>{f.note}</span>
                          <span style={{ fontSize: 12, color: '#9ca3af' }}>({f.avis})</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 14 }}>{f.commandesHaiti} cmds Haïti</div>
                        <Link href={`/fournisseurs/${f.id}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '8px 14px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                          Voir profil →
                        </Link>
                      </div>
                    </div>

                    {/* Footer metrics */}
                    <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 14, borderTop: '1px solid #f3f4f6', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>📦 MOQ <strong style={{ color: '#111827' }}>{f.moqMin} u.</strong></span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>⏱️ <strong style={{ color: '#111827' }}>{f.delaiFabrication}</strong></span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>🚢 {f.incoterms.join(' / ')}</span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>💳 {f.paiements.slice(0, 2).join(', ')}</span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>🗣️ {f.langues.slice(0, 3).join(', ')}</span>
                      <span style={{ fontSize: 12, color: f.tauxRepondre >= 95 ? '#10b981' : '#f59e0b', fontWeight: 600 }}>📲 {f.tauxRepondre}% réponse</span>
                    </div>

                    {/* Products */}
                    <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>Produits phares :</span>
                      {f.produitsStar.map(p => (
                        <span key={p} style={{ fontSize: 11, background: '#fafafa', color: '#4b5563', padding: '2px 8px', borderRadius: 4, border: '1px solid #e5e7eb' }}>{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
