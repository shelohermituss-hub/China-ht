'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CATEGORIES, VILLES_CHINE } from '@/lib/data'

export default function NouvelleDemandePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    titre: '',
    categorie: '',
    quantite: '',
    unite: 'unités',
    budget: '',
    destination: 'Port-au-Prince',
    incoterm: 'FOB',
    paiement: 'T/T',
    details: '',
    certifications: [] as string[],
    villes: [] as string[],
    delai: '30 jours',
    urgent: false,
  })

  const update = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) { setStep(step + 1); return }
    setLoading(true)
    setTimeout(() => router.push('/demandes'), 1500)
  }

  const STEPS = ['Produit', 'Conditions', 'Confirmation']

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
        <Link href="/demandes" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Demandes RFQ</Link>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#111827', fontWeight: 600 }}>Nouvelle demande</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Créer une demande de devis</h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>China-HT diffusera votre RFQ à des fournisseurs qualifiés. Réponses sous 48h.</p>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
        {STEPS.map((s, i) => {
          const n = i + 1
          const done = step > n
          const active = step === n
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#10b981' : active ? 'var(--color-primary)' : '#e5e7eb', color: done || active ? 'white' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {done ? '✓' : n}
                </div>
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? '#111827' : done ? '#10b981' : '#9ca3af', whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: done ? '#10b981' : '#e5e7eb', margin: '0 12px' }} />}
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div style={{ background: 'white', borderRadius: 14, padding: '28px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>📦 Description du produit</h2>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Titre de la demande *</label>
              <input required value={form.titre} onChange={e => update('titre', e.target.value)}
                placeholder="Ex: Tissu jersey coton 200gsm — 500 kg"
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Catégorie *</label>
                <select required value={form.categorie} onChange={e => update('categorie', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  <option value="">Sélectionnez...</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icone} {c.nom}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Villes cibles (Chine)</label>
                <select style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  <option value="">Toutes les villes</option>
                  {VILLES_CHINE.map(v => <option key={v.id} value={v.id}>{v.nom}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Quantité souhaitée *</label>
                <input required value={form.quantite} onChange={e => update('quantite', e.target.value)}
                  placeholder="500"
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Unité</label>
                <select value={form.unite} onChange={e => update('unite', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {['unités', 'kg', 'tonnes', 'mètres', 'm²', 'cartons', 'container 20\'', 'container 40\''].map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Budget maximum (USD)</label>
              <input type="number" value={form.budget} onChange={e => update('budget', e.target.value)}
                placeholder="10000"
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Description détaillée & spécifications *</label>
              <textarea required value={form.details} onChange={e => update('details', e.target.value)}
                placeholder="Décrivez précisément : matière, dimensions, couleurs, certifications requises, qualité souhaitée, packaging, marque/logo, etc."
                rows={5}
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.urgent} onChange={e => update('urgent', e.target.checked)}
                style={{ accentColor: '#e63946', width: 16, height: 16 }} />
              <span>🔴 Marquer comme <strong>URGENT</strong> — traitement prioritaire (délai livraison court)</span>
            </label>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: 'white', borderRadius: 14, padding: '28px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>🚢 Conditions commerciales</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Incoterm souhaité</label>
                <select value={form.incoterm} onChange={e => update('incoterm', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {['FOB', 'CIF', 'EXW', 'DAP', 'DDP'].map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Mode de paiement</label>
                <select value={form.paiement} onChange={e => update('paiement', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {['T/T', 'L/C', 'Trade Assurance', 'Western Union', 'MoneyGram', 'Wise'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Port de destination</label>
                <select value={form.destination} onChange={e => update('destination', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {['Port-au-Prince', 'Cap-Haïtien', 'Jacmel'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Délai de livraison souhaité</label>
                <select value={form.delai} onChange={e => update('delai', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {['ASAP (urgent)', '30 jours', '45 jours', '60 jours', '90 jours', 'Flexible'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Certifications requises</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {['CE', 'ISO 9001', 'SGS', 'OEKO-TEX', 'RoHS', 'EN 71', 'GMP', 'IEC'].map(c => (
                  <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#374151', cursor: 'pointer', padding: '7px 10px', border: `1.5px solid ${form.certifications.includes(c) ? 'var(--color-primary)' : '#e5e7eb'}`, borderRadius: 7, background: form.certifications.includes(c) ? '#eff6ff' : 'white' }}
                    onClick={() => update('certifications', form.certifications.includes(c) ? form.certifications.filter(x => x !== c) : [...form.certifications, c])}>
                    <input type="checkbox" checked={form.certifications.includes(c)} readOnly style={{ accentColor: 'var(--color-primary)' }} />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            {/* Info box */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#1e40af' }}>
              <strong>ℹ️ Incoterm {form.incoterm}</strong> :{' '}
              {form.incoterm === 'FOB' && 'Le fournisseur paie jusqu\'au port de départ. Vous gérez le fret maritime et l\'assurance.'}
              {form.incoterm === 'CIF' && 'Le fournisseur inclut le coût, l\'assurance et le fret jusqu\'au port de destination.'}
              {form.incoterm === 'EXW' && 'Vous gérez tout le transport depuis l\'usine. Moins cher mais plus complexe.'}
              {form.incoterm === 'DAP' && 'Livraison au lieu convenu — le fournisseur gère tout sauf le dédouanement à l\'arrivée.'}
              {form.incoterm === 'DDP' && 'Livraison tous droits acquittés — le fournisseur gère tout jusqu\'à votre entrepôt.'}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ background: 'white', borderRadius: 14, padding: '28px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>✅ Confirmation de la demande</h2>

            <div style={{ background: '#f9fafb', borderRadius: 10, padding: '18px', marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>Récapitulatif</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Produit', value: form.titre || 'Non renseigné' },
                  { label: 'Quantité', value: `${form.quantite} ${form.unite}` },
                  { label: 'Budget max.', value: form.budget ? `$${Number(form.budget).toLocaleString()}` : 'Non renseigné' },
                  { label: 'Incoterm', value: form.incoterm },
                  { label: 'Destination', value: form.destination },
                  { label: 'Délai', value: form.delai },
                  { label: 'Urgent', value: form.urgent ? '🔴 Oui' : 'Non' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                    <span style={{ color: '#6b7280' }}>{r.label}</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#92400e' }}>
              🌟 Votre demande sera diffusée à <strong>5–15 fournisseurs vérifiés</strong> correspondant à votre catégorie. Vous recevrez les devis sous <strong>24–72h</strong> directement dans cette interface.
            </div>

            {loading && (
              <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 14, color: '#6b7280' }}>
                ⏳ Envoi de votre demande aux fournisseurs...
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}
              style={{ flex: 1, padding: '12px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              ← Retour
            </button>
          )}
          <button type="submit" disabled={loading}
            style={{ flex: 2, padding: '12px', background: step === 3 ? '#10b981' : 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: loading ? 'wait' : 'pointer' }}>
            {step < 3 ? 'Continuer →' : loading ? '⏳ Envoi...' : '✅ Envoyer la demande RFQ'}
          </button>
        </div>
      </form>
    </div>
  )
}
