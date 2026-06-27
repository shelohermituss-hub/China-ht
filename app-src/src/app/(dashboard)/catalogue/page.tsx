'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, FOURNISSEURS, VILLES_CHINE } from '@/lib/data'

export default function CataloguePage() {
  const [selectedCat, setSelectedCat] = useState<string>('all')
  const [selectedVille, setSelectedVille] = useState<string>('all')
  const [search, setSearch] = useState('')

  const fournisseursFiltres = FOURNISSEURS.filter(f => {
    const matchCat = selectedCat === 'all' || f.categories.some(c => c.toLowerCase().includes(selectedCat.toLowerCase()))
    const matchVille = selectedVille === 'all' || f.ville.toLowerCase() === selectedVille.toLowerCase()
    const matchSearch = !search || f.nom.toLowerCase().includes(search.toLowerCase()) || f.specialite.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchVille && matchSearch
  })

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Catalogue produits 🛍️</h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Explorez 10 catégories et 20 000+ produits des meilleurs fournisseurs chinois pour Haïti</p>
      </div>

      {/* Catégories grid */}
      <div style={{ background: 'white', borderRadius: 12, padding: '20px', border: '1px solid #e5e7eb', marginBottom: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>Catégories</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCat('all')}
            style={{ padding: '8px 16px', borderRadius: 99, border: '1.5px solid', borderColor: selectedCat === 'all' ? 'var(--color-primary)' : '#e5e7eb', background: selectedCat === 'all' ? '#eff6ff' : 'white', color: selectedCat === 'all' ? 'var(--color-primary)' : '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            🌐 Toutes les catégories
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              style={{ padding: '8px 16px', borderRadius: 99, border: '1.5px solid', borderColor: selectedCat === cat.id ? cat.couleur : '#e5e7eb', background: selectedCat === cat.id ? cat.couleur + '15' : 'white', color: selectedCat === cat.id ? cat.couleur : '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              {cat.icone} {cat.nom}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
        {/* Filters sidebar */}
        <div>
          <div style={{ background: 'white', borderRadius: 12, padding: '18px', border: '1px solid #e5e7eb', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>🔍 Rechercher</h3>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Produit, fournisseur..."
              style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ background: 'white', borderRadius: 12, padding: '18px', border: '1px solid #e5e7eb', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>🇨🇳 Ville chinoise</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[{ id: 'all', nom: 'Toutes les villes' }, ...VILLES_CHINE].map(v => (
                <label key={v.id} onClick={() => setSelectedVille(v.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '7px 8px', borderRadius: 7, background: selectedVille === v.id ? '#eff6ff' : 'transparent' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${selectedVille === v.id ? 'var(--color-primary)' : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {selectedVille === v.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />}
                  </div>
                  <span style={{ fontSize: 13, color: selectedVille === v.id ? 'var(--color-primary)' : '#374151', fontWeight: selectedVille === v.id ? 600 : 400 }}>{v.nom}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 12, padding: '18px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>📦 MOQ (Qté min.)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Tout MOQ', '< 50 unités', '50–200 unités', '> 200 unités'].map(m => (
                <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#374151', padding: '5px 0' }}>
                  <input type="radio" name="moq" style={{ accentColor: 'var(--color-primary)' }} defaultChecked={m === 'Tout MOQ'} />
                  {m}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#6b7280' }}><strong style={{ color: '#111827' }}>{fournisseursFiltres.length}</strong> fournisseurs trouvés</span>
            <select style={{ padding: '7px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', background: 'white' }}>
              <option>Trier par : Pertinence</option>
              <option>Note (↓)</option>
              <option>Commandes Haïti (↓)</option>
              <option>MOQ minimum</option>
            </select>
          </div>

          {fournisseursFiltres.length === 0 ? (
            <div style={{ background: 'white', borderRadius: 12, padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Aucun résultat</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>Essayez de modifier vos filtres</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {fournisseursFiltres.map(f => (
                <div key={f.id} style={{ background: 'white', borderRadius: 12, border: '1.5px solid #e5e7eb', overflow: 'hidden', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(42,133,255,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {/* Avatar */}
                      <div style={{ width: 52, height: 52, borderRadius: 12, background: f.couleur + '20', color: f.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{f.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>{f.nom}</h3>
                          {f.verifie && <span style={{ fontSize: 11, background: '#f0fdf4', color: '#10b981', padding: '1px 8px', borderRadius: 99, fontWeight: 700, flexShrink: 0 }}>✓ Vérifié SGS</span>}
                          {f.badgeOr && <span style={{ fontSize: 11, background: '#fffbeb', color: '#d97706', padding: '1px 8px', borderRadius: 99, fontWeight: 700, flexShrink: 0 }}>⭐ Badge Or</span>}
                        </div>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
                          📍 {f.ville}, Chine · {f.nomZH} · Depuis {f.anneeCreation}
                        </div>
                        <p style={{ fontSize: 13, color: '#4b5563', margin: '0 0 12px', lineHeight: 1.5 }}>{f.specialite}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {f.certifications.map(c => <span key={c} style={{ fontSize: 11, background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: 4 }}>{c}</span>)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginBottom: 4 }}>
                          <span style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
                          <span style={{ fontSize: 15, fontWeight: 800, color: '#111827' }}>{f.note}</span>
                          <span style={{ fontSize: 12, color: '#9ca3af' }}>({f.avis})</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 12 }}>
                          {f.commandesHaiti} cmds Haïti
                        </div>
                        <Link href={`/fournisseurs/${f.id}`} style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 14px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                          Voir profil →
                        </Link>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 20, marginTop: 14, paddingTop: 14, borderTop: '1px solid #f3f4f6', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>📦 MOQ : <strong style={{ color: '#111827' }}>{f.moqMin} unités</strong></span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>⏱️ Fabrication : <strong style={{ color: '#111827' }}>{f.delaiFabrication}</strong></span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>💳 Paiements : <strong style={{ color: '#111827' }}>{f.paiements.slice(0, 2).join(', ')}</strong></span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>🗣️ {f.langues.slice(0, 3).join(', ')}</span>
                      <span style={{ fontSize: 12, color: f.tauxRepondre >= 95 ? '#10b981' : '#f59e0b', fontWeight: 600 }}>📲 {f.tauxRepondre}% réponse</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Canton Fair banner */}
          <div style={{ marginTop: 20, background: 'linear-gradient(135deg, #111827, #1f2937)', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 32 }}>🏛️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>Canton Fair — Octobre & Novembre 2026</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Plus grande foire commerciale de Chine · Guangzhou · 60 000 stands · Inscriptions ouvertes</div>
            </div>
            <button style={{ padding: '10px 18px', background: '#e63946', color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
              En savoir plus →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
