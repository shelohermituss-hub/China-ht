'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 1000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Left — branding */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #001f5b 0%, #003087 50%, #1a1a4e 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, #e6394622 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 440, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #003087, #e63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🌏</div>
            <span style={{ fontWeight: 800, fontSize: 22, color: 'white' }}>China-HT</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 18 }}>
            Votre pont entre<br />
            <span style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Haïti et la Chine</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 40 }}>
            Accédez à 20 000+ fournisseurs vérifiés, gérez vos commandes et suivez vos conteneurs en temps réel.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { ico: '🛡️', t: 'Fournisseurs vérifiés SGS' },
              { ico: '🗣️', t: 'Agents bilingues créole / mandarin' },
              { ico: '🚢', t: 'Tracking conteneur Port-au-Prince' },
              { ico: '💱', t: `1 USD = 130.73 HTG (BRH)` },
            ].map(f => (
              <div key={f.t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18 }}>{f.ico}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{f.t}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Flag bar bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #003087 50%, #D21034 50%)' }} />
      </div>

      {/* Right — form */}
      <div style={{ width: 480, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5%', background: 'white' }}>
        <div style={{ maxWidth: 380, margin: '0 auto', width: '100%' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Connexion</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32 }}>
            Pas encore de compte ?{' '}
            <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Créer un compte</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Adresse email</label>
              <input type="email" required placeholder="jean@example.com" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Mot de passe</label>
                <span style={{ fontSize: 12, color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 500 }}>Mot de passe oublié ?</span>
              </div>
              <input type="password" required placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#2a85ff', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? '⏳ Connexion...' : '→ Se connecter'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
            <span style={{ fontSize: 12, color: '#9ca3af' }}>ou continuer avec</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {['🇭🇹 Créole / FR', '🌐 Google', '📱 WhatsApp'].map(opt => (
              <button key={opt} style={{ flex: 1, padding: '9px 8px', border: '1.5px solid #e5e7eb', borderRadius: 8, background: 'white', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>{opt}</button>
            ))}
          </div>

          <p style={{ marginTop: 32, fontSize: 12, color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>
            En vous connectant, vous acceptez nos{' '}
            <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Conditions d&apos;utilisation</span>{' '}
            et notre{' '}
            <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Politique de confidentialité</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
