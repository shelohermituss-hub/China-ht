'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) { setStep(step + 1); return }
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 1200)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Left branding */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #001f5b, #003087)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, #e6394618 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 420, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #003087, #e63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🌏</div>
            <span style={{ fontWeight: 800, fontSize: 22, color: 'white' }}>China-HT</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 20 }}>Rejoignez<br />la communauté<br /><span style={{ color: '#e63946' }}>d&apos;importateurs haïtiens</span></h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 36 }}>Plus de 500 entrepreneurs haïtiens importent déjà depuis la Chine via China-HT.</p>
          {/* Steps indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { n: 1, t: 'Informations personnelles' },
              { n: 2, t: 'Votre activité' },
              { n: 3, t: 'Finalisez votre compte' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= s.n ? '#e63946' : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span style={{ fontSize: 14, color: step >= s.n ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: step === s.n ? 700 : 400 }}>{s.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #003087 50%, #D21034 50%)' }} />
      </div>

      {/* Right form */}
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5%', background: 'white', overflowY: 'auto' }}>
        <div style={{ maxWidth: 400, margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Étape {step} sur 3</div>
            <div style={{ height: 4, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: '100%', width: `${(step / 3) * 100}%`, background: 'var(--color-primary)', transition: 'width 0.3s ease', borderRadius: 99 }} />
            </div>
          </div>

          {step === 1 && (
            <>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 24 }}>Vos informations</h2>
              <form onSubmit={handleNext}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Prénom</label>
                    <input required placeholder="Jean" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Nom</label>
                    <input required placeholder="Dupont" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Email</label>
                  <input type="email" required placeholder="jean@exemple.com" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Téléphone (WhatsApp)</label>
                  <input type="tel" required placeholder="+509 3700 0000" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Nous utilisons WhatsApp pour vous alertes importantes sur vos commandes</p>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Ville (Haïti)</label>
                  <select required style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                    <option value="">Sélectionnez votre ville...</option>
                    {['Port-au-Prince', 'Pétion-Ville', 'Cap-Haïtien', 'Gonaïves', 'Les Cayes', 'Saint-Marc', 'Jacmel', 'Hinche', 'Jérémie', 'Port-de-Paix'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Continuer →
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 24 }}>Votre activité</h2>
              <form onSubmit={handleNext}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Type d&apos;activité</label>
                  <select required style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                    <option value="">Sélectionnez...</option>
                    {['Commerce de détail', 'Commerce de gros', 'Boutique en ligne', 'Revente marchés', 'Construction / BTP', 'Agriculture', 'Distribution', 'Autre'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Catégories qui vous intéressent</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {['Textiles', 'Électronique', 'Construction', 'Alimentaire', 'Cosmétiques', 'Énergie solaire', 'Jouets', 'Mobilier'].map(c => (
                      <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: 'var(--color-primary)' }} />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Budget mensuel d&apos;importation (USD)</label>
                  <select style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                    {['< $500', '$500 – $2,000', '$2,000 – $10,000', '$10,000 – $50,000', '> $50,000'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '12px', background: '#f9fafb', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Retour</button>
                  <button type="submit" style={{ flex: 2, padding: '12px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Continuer →</button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 24 }}>Sécurisez votre compte</h2>
              <form onSubmit={handleNext}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Mot de passe</label>
                  <input type="password" required placeholder="Min. 8 caractères" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Confirmer le mot de passe</label>
                  <input type="password" required placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 14px', marginBottom: 20, fontSize: 13, color: '#1e40af', lineHeight: 1.5 }}>
                  🎁 <strong>Bonus de bienvenue :</strong> Accès gratuit pendant 30 jours à nos agents terrain en Chine pour votre première commande.
                </div>
                <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#374151', marginBottom: 20, cursor: 'pointer' }}>
                  <input type="checkbox" required style={{ accentColor: 'var(--color-primary)', marginTop: 2 }} />
                  J&apos;accepte les <span style={{ color: 'var(--color-primary)' }}>Conditions d&apos;utilisation</span> et la <span style={{ color: 'var(--color-primary)' }}>Politique de confidentialité</span>
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={() => setStep(2)} style={{ flex: 1, padding: '12px', background: '#f9fafb', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Retour</button>
                  <button type="submit" disabled={loading} style={{ flex: 2, padding: '12px', background: '#e63946', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: loading ? 'wait' : 'pointer' }}>
                    {loading ? '⏳ Création...' : '🚀 Créer mon compte'}
                  </button>
                </div>
              </form>
            </>
          )}

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
            Déjà un compte ? <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
