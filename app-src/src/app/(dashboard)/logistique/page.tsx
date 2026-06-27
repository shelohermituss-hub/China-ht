'use client'
import { useState } from 'react'
import { COUTS_FRET, DELAIS_TRANSIT, VILLES_CHINE, TAXES_HAITI, USD_TO_HTG, PORTS_HAITI, formatUSD } from '@/lib/data'

export default function LogistiquePage() {
  const [villeDepart, setVilleDepart] = useState('guangzhou')
  const [portArrivee, setPortArrivee] = useState('pap')
  const [typeContainer, setTypeContainer] = useState<'container20' | 'container40' | 'lcl'>('container20')
  const [volumeLCL, setVolumeLCL] = useState(5)
  const [valeurMarchandise, setValeurMarchandise] = useState(5000)
  const [categorieDouane, setCategorieDouane] = useState<'standard' | 'alimentaire'>('standard')

  const delais = DELAIS_TRANSIT[villeDepart] ?? { min: 35, max: 45 }
  const fretUSD = typeContainer === 'lcl'
    ? COUTS_FRET.lcl_m3.usd * volumeLCL
    : typeContainer === 'container40'
    ? COUTS_FRET.container40.usd
    : COUTS_FRET.container20.usd

  const valeurCIF = valeurMarchandise + fretUSD
  const tauxBase = categorieDouane === 'alimentaire' ? 18 : 16
  const taxes = valeurCIF * (tauxBase / 100)
  const coutTotal = valeurCIF + taxes
  const coutTotalHTG = coutTotal * USD_TO_HTG

  const detailsTaxes = categorieDouane === 'alimentaire'
    ? [
        { label: 'Vérification AGD (5%)', montant: valeurCIF * 0.05 },
        { label: 'TVA (10%)', montant: valeurCIF * 0.10 },
        { label: 'Droit spécial (1%)', montant: valeurCIF * 0.01 },
        { label: 'Droit alimentaire (3%)', montant: valeurCIF * 0.03 },
      ]
    : [
        { label: 'Vérification AGD (5%)', montant: valeurCIF * 0.05 },
        { label: 'TVA (10%)', montant: valeurCIF * 0.10 },
        { label: 'Droit spécial (1%)', montant: valeurCIF * 0.01 },
      ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Calculateur de coûts logistiques 🧮</h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Estimez le coût total de votre importation depuis la Chine vers Haïti</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        {/* Calculator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Route */}
          <div style={{ background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>🗺️ Itinéraire</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>🇨🇳 Port de départ (Chine)</label>
                <select value={villeDepart} onChange={e => setVilleDepart(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {VILLES_CHINE.map(v => <option key={v.id} value={v.id}>{v.nom}</option>)}
                </select>
              </div>
              <div style={{ textAlign: 'center', fontSize: 20 }}>🚢</div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>🇭🇹 Port d'arrivée (Haïti)</label>
                <select value={portArrivee} onChange={e => setPortArrivee(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {PORTS_HAITI.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: 14, padding: '10px 14px', background: '#eff6ff', borderRadius: 8, fontSize: 13, color: '#1e40af' }}>
              ⏱️ Délai estimé depuis <strong>{VILLES_CHINE.find(v => v.id === villeDepart)?.nom}</strong> : <strong>{delais.min}–{delais.max} jours</strong>
            </div>
          </div>

          {/* Transport type */}
          <div style={{ background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>📦 Type de transport</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { key: 'container20', label: 'Container 20\'', detail: '~25 tonnes / 33 m³', price: COUTS_FRET.container20.usd, icon: '🟦' },
                { key: 'container40', label: 'Container 40\'', detail: '~26 tonnes / 67 m³', price: COUTS_FRET.container40.usd, icon: '🟫' },
                { key: 'lcl', label: 'LCL (Groupage)', detail: 'Au m³ — idéal petits volumes', price: COUTS_FRET.lcl_m3.usd, icon: '📦' },
              ].map(t => (
                <button key={t.key} type="button" onClick={() => setTypeContainer(t.key as typeof typeContainer)}
                  style={{ padding: '14px', border: `2px solid ${typeContainer === t.key ? 'var(--color-primary)' : '#e5e7eb'}`, borderRadius: 10, background: typeContainer === t.key ? '#eff6ff' : 'white', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: typeContainer === t.key ? 'var(--color-primary)' : '#111827', marginBottom: 3 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>{t.detail}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: typeContainer === t.key ? 'var(--color-primary)' : '#374151' }}>
                    {formatUSD(t.price)}{t.key === 'lcl' ? '/m³' : ''}
                  </div>
                </button>
              ))}
            </div>

            {typeContainer === 'lcl' && (
              <div style={{ marginTop: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Volume en m³</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="range" min={1} max={30} value={volumeLCL} onChange={e => setVolumeLCL(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--color-primary)' }} />
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#111827', minWidth: 60, textAlign: 'right' }}>{volumeLCL} m³</div>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>= {formatUSD(COUTS_FRET.lcl_m3.usd * volumeLCL)} de fret maritime</div>
              </div>
            )}
          </div>

          {/* Merchandise value */}
          <div style={{ background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>💰 Valeur de la marchandise</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Valeur FOB (USD)</label>
                <input type="number" value={valeurMarchandise} onChange={e => setValeurMarchandise(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 15, fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Catégorie douanière</label>
                <select value={categorieDouane} onChange={e => setCategorieDouane(e.target.value as typeof categorieDouane)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  <option value="standard">Standard (16% taxes)</option>
                  <option value="alimentaire">Alimentaire/Riz (18%+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Taxes breakdown */}
          <div style={{ background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>🏛️ Détail des taxes haïtiennes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#f9fafb', borderRadius: '8px 8px 0 0', fontSize: 13, borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>Valeur FOB</span>
                <span style={{ fontWeight: 600 }}>{formatUSD(valeurMarchandise)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#f9fafb', fontSize: 13, borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>+ Fret maritime</span>
                <span style={{ fontWeight: 600 }}>+ {formatUSD(fretUSD)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#eff6ff', fontSize: 13, fontWeight: 700, borderBottom: '1px solid #bfdbfe' }}>
                <span style={{ color: '#1e40af' }}>= Valeur CIF (base taxes)</span>
                <span style={{ color: '#1e40af' }}>{formatUSD(valeurCIF)}</span>
              </div>
              {detailsTaxes.map(t => (
                <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', fontSize: 13, borderBottom: '1px solid #f3f4f6', background: 'white' }}>
                  <span style={{ color: '#6b7280' }}>{t.label}</span>
                  <span style={{ fontWeight: 600, color: '#e63946' }}>+ {formatUSD(t.montant)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 12px', background: '#111827', borderRadius: '0 0 8px 8px', fontSize: 15, fontWeight: 800 }}>
                <span style={{ color: 'white' }}>💰 Coût total estimé</span>
                <span style={{ color: '#4ade80' }}>{formatUSD(coutTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results panel (sticky) */}
        <div>
          <div style={{ background: 'white', borderRadius: 14, border: '2px solid var(--color-primary)', overflow: 'hidden', position: 'sticky', top: 88 }}>
            <div style={{ background: 'var(--color-primary)', padding: '16px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Estimation totale</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: 'white' }}>{formatUSD(coutTotal)}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{Math.round(coutTotalHTG).toLocaleString('fr-HT')} HTG</div>
            </div>
            <div style={{ padding: '18px 20px' }}>
              {[
                { label: 'Fret maritime', value: formatUSD(fretUSD), icon: '🚢' },
                { label: 'Marchandise', value: formatUSD(valeurMarchandise), icon: '📦' },
                { label: 'Taxes Haïti', value: formatUSD(taxes), icon: '🏛️' },
                { label: 'Délai transit', value: `${delais.min}–${delais.max}j`, icon: '⏱️' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, fontSize: 13 }}>
                  <span style={{ color: '#6b7280' }}>{r.icon} {r.label}</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>{r.value}</span>
                </div>
              ))}

              <div style={{ height: 1, background: '#f3f4f6', margin: '14px 0' }} />

              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 14, lineHeight: 1.6 }}>
                Taux de change : <strong style={{ color: '#374151' }}>1 USD = {USD_TO_HTG} HTG</strong> (BRH, juin 2026)
              </div>

              <button style={{ width: '100%', padding: '11px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
                📧 Recevoir cette estimation
              </button>
              <button style={{ width: '100%', padding: '11px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                📄 Exporter PDF
              </button>
            </div>
          </div>

          {/* Info cards */}
          <div style={{ marginTop: 14, background: '#fef3c7', borderRadius: 10, padding: '14px', border: '1px solid #fde68a' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>⚠️ Important</div>
            <p style={{ fontSize: 12, color: '#78350f', margin: 0, lineHeight: 1.6 }}>
              Ces estimations sont basées sur les taux en vigueur (juin 2026). Les taxes réelles dépendent de la classification douanière HS Code et peuvent varier.
            </p>
          </div>

          <div style={{ marginTop: 10, background: '#f0fdf4', borderRadius: 10, padding: '14px', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#065f46', marginBottom: 6 }}>💡 Conseil</div>
            <p style={{ fontSize: 12, color: '#047857', margin: 0, lineHeight: 1.6 }}>
              Pour les textiles (HOPE II) : une partie peut bénéficier d'exonérations douanières aux USA. Renseignez-vous auprès de notre équipe.
            </p>
          </div>
        </div>
      </div>

      {/* Ports info */}
      <div style={{ marginTop: 24, background: 'white', borderRadius: 12, padding: '22px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>🇭🇹 Ports haïtiens — informations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {PORTS_HAITI.map(p => (
            <div key={p.id} style={{ padding: '14px', background: portArrivee === p.id ? '#eff6ff' : '#f9fafb', borderRadius: 10, border: `1.5px solid ${portArrivee === p.id ? 'var(--color-primary)' : '#e5e7eb'}`, cursor: 'pointer' }}
              onClick={() => setPortArrivee(p.id)}>
              <div style={{ fontSize: 16, fontWeight: 700, color: portArrivee === p.id ? 'var(--color-primary)' : '#111827', marginBottom: 4 }}>{p.nom}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: portArrivee === p.id ? 'var(--color-primary)' : '#374151', marginBottom: 4 }}>{p.part}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{p.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
