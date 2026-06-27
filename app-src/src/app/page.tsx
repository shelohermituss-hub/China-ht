import Link from 'next/link'
import { CATEGORIES, VILLES_CHINE, USD_TO_HTG } from '@/lib/data'

export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: 'white', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--color-gray-200)', zIndex: 50, padding: '0 5%', display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #003087, #e63946)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌏</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--color-gray-900)' }}>China-HT</span>
          <span style={{ fontSize: 11, color: 'var(--color-gray-400)', fontWeight: 500 }}>Sourcing Haïti ↔ Chine</span>
        </div>
        <a href="#categories" style={{ fontSize: 14, color: 'var(--color-gray-600)', fontWeight: 500, textDecoration: 'none' }}>Catégories</a>
        <a href="#villes" style={{ fontSize: 14, color: 'var(--color-gray-600)', fontWeight: 500, textDecoration: 'none' }}>Villes Chine</a>
        <a href="#comment" style={{ fontSize: 14, color: 'var(--color-gray-600)', fontWeight: 500, textDecoration: 'none' }}>Comment ça marche</a>
        <Link href="/login" style={{ fontSize: 14, color: 'var(--color-gray-600)', fontWeight: 500, textDecoration: 'none' }}>Connexion</Link>
        <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
          Commencer gratuitement
        </Link>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #001f5b 0%, #003087 45%, #1a1a4e 100%)', padding: '96px 5% 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #e6394618 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: '8%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, #2a85ff18 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 99, marginBottom: 28, border: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ fontSize: 15 }}>🇭🇹</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>Haïti</span>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>↔</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>Chine</span>
            <span style={{ fontSize: 15 }}>🇨🇳</span>
            <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Plateforme B2B #1 pour Haïti</span>
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 800, color: 'white', lineHeight: 1.08, marginBottom: 22, letterSpacing: '-0.02em' }}>
            Importez depuis la Chine<br />
            <span style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>en toute confiance</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, marginBottom: 40, maxWidth: 600 }}>
            La première plateforme de sourcing conçue pour les entrepreneurs haïtiens.
            Fournisseurs vérifiés SGS, prix transparents, agents bilingues créole/mandarin — de Guangzhou à Port-au-Prince.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', background: '#e63946', color: 'white', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 4px 24px rgba(230,57,70,0.4)' }}>
              🚀 Créer mon compte gratuit
            </Link>
            <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 16, border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none' }}>
              📦 Explorer la plateforme →
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 40, marginTop: 56, flexWrap: 'wrap' }}>
            {[
              { val: '20,000+', label: 'Fournisseurs vérifiés' },
              { val: '10', label: 'Catégories produits' },
              { val: '6', label: 'Villes chinoises' },
              { val: '26–55j', label: 'Port-au-Prince' },
            ].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: 30, fontWeight: 800, color: 'white' }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: '#111827', padding: '10px 5%', display: 'flex', gap: 36, overflowX: 'auto', alignItems: 'center' }}>
        {[
          { label: '1 USD', val: `${USD_TO_HTG.toFixed(2)} HTG`, src: 'BRH' },
          { label: "Container 20'", val: '~1,208 USD', src: 'Fret moyen' },
          { label: 'Taxes import Haïti', val: '~16% CIF', src: 'AGD' },
          { label: 'Canton Fair prochain', val: 'Oct–Nov 2026', src: 'Guangzhou' },
          { label: 'Transit moyen', val: '38 jours', src: 'Port-au-Prince' },
          { label: 'Marché Yiwu', val: '365 j/an ouvert', src: 'Yiwu' },
        ].map(t => (
          <div key={t.label} style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>{t.label}:</span>
            <span style={{ fontSize: 13, color: 'white', fontWeight: 700 }}>{t.val}</span>
            <span style={{ fontSize: 10, color: '#374151', background: '#1f2937', padding: '1px 6px', borderRadius: 4 }}>{t.src}</span>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <section id="categories" style={{ padding: '80px 5%', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Catalogue</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#111827', margin: '8px 0 12px' }}>10 catégories de produits</h2>
          <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 520, margin: '0 auto' }}>Chaque catégorie est liée aux meilleurs fournisseurs vérifiés et aux villes chinoises spécialisées</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))', gap: 16, maxWidth: 1280, margin: '0 auto' }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/catalogue?categorie=${cat.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', borderRadius: 12, padding: '20px', border: '1.5px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.couleur; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${cat.couleur}20`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 30 }}>{cat.icone}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#111827', lineHeight: 1.2 }}>{cat.nom}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{cat.nomZH}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 14px', lineHeight: 1.55 }}>{cat.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: cat.couleur }}>{cat.fournisseurs.toLocaleString()} fournisseurs</span>
                  <span style={{ fontSize: 11, background: cat.couleur + '18', color: cat.couleur, padding: '2px 9px', borderRadius: 99, fontWeight: 600 }}>{cat.demandeNiveau}</span>
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {cat.villesChine.map(v => <span key={v} style={{ fontSize: 10, background: '#f3f4f6', color: '#6b7280', padding: '2px 7px', borderRadius: 4 }}>{v}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="comment" style={{ padding: '80px 5%', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#e63946', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Processus simplifié</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#111827', margin: '8px 0' }}>De l'idée au produit en 5 étapes</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
          {[
            { n: '01', ico: '🔍', t: 'Cherchez un produit', d: 'Parcourez 20 000+ produits par catégorie, prix et ville chinoise' },
            { n: '02', ico: '📝', t: 'Envoyez une RFQ', d: 'Demande de devis automatique vers plusieurs fournisseurs en même temps' },
            { n: '03', ico: '🤝', t: 'Comparez et négociez', d: 'Recevez plusieurs offres, négociez avec nos agents bilingues' },
            { n: '04', ico: '💳', t: 'Payez en sécurité', d: 'Trade Assurance — votre argent bloqué jusqu\'à réception conforme' },
            { n: '05', ico: '🚢', t: 'Suivez votre cargaison', d: 'Tracking temps réel de Guangzhou à Port-au-Prince' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #eff6ff, #ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>{s.ico}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-primary)', marginBottom: 6, letterSpacing: '0.1em' }}>ÉTAPE {s.n}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{s.t}</div>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VILLES CHINOISES */}
      <section id="villes" style={{ padding: '80px 5%', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#e63946', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hubs de sourcing 🇨🇳</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#111827', margin: '8px 0 12px' }}>Les 6 villes incontournables</h2>
          <p style={{ fontSize: 16, color: '#6b7280' }}>Chaque ville est spécialisée dans des produits précis — vos agents terrain vous y accompagnent</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, maxWidth: 1280, margin: '0 auto' }}>
          {VILLES_CHINE.map(ville => (
            <div key={ville.id} style={{ background: 'white', borderRadius: 12, padding: '20px', border: '1.5px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 26 }}>{ville.icone}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{ville.nom}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{ville.province} · {ville.fournisseurs.toLocaleString()} fournisseurs</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 3 }}>⭐ {ville.note}</div>
              </div>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.55, marginBottom: 12 }}>{ville.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {ville.categories.map(c => <span key={c} style={{ fontSize: 11, background: '#eff6ff', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: 4, fontWeight: 500 }}>{c}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6b7280', paddingTop: 10, borderTop: '1px solid #f3f4f6' }}>
                <span>🚢 {ville.dureePortPAP}</span>
                <span>✈️ {ville.avion.split('—')[0].trim()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: '80px 5%', background: 'linear-gradient(135deg, #001f5b, #003087)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 38, fontWeight: 800, color: 'white', margin: '0 0 14px' }}>Nous résolvons vos vrais problèmes</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>Les obstacles que tout importateur haïtien connaît — enfin résolus</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
            {[
              { ico: '🗣️', p: 'Barrière de la langue', s: 'Agents bilingues créole haïtien / mandarin basés en Chine' },
              { ico: '🛡️', p: 'Arnaques fournisseurs', s: 'Vérification SGS + historique réel des commandes vers Haïti' },
              { ico: '💳', p: 'Paiements internationaux difficiles', s: 'Trade Assurance + Western Union + guide virements SWIFT' },
              { ico: '✅', p: 'Qualité imprévisible', s: 'Inspection pré-expédition + photos et vidéos de production' },
              { ico: '📦', p: 'MOQ trop élevés', s: 'Groupage LCL + commandes groupées avec d\'autres importateurs haïtiens' },
              { ico: '🏛️', p: 'Douanes haïtiennes complexes', s: 'Calculateur de taxes intégré + guide AGD + transitaires partenaires' },
            ].map(item => (
              <div key={item.p} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: 26 }}>{item.ico}</span>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 12, fontWeight: 500 }}>❌ {item.p}</div>
                <div style={{ fontSize: 14, color: 'white', marginTop: 8, fontWeight: 600, lineHeight: 1.55 }}>✅ {item.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '90px 5%', background: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Prêt à importer depuis la Chine ?</h2>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          Créez votre compte gratuit et accédez à 20 000+ fournisseurs vérifiés dès aujourd&apos;hui.
        </p>
        <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 40px', background: '#e63946', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 18, textDecoration: 'none', boxShadow: '0 8px 32px rgba(230,57,70,0.35)' }}>
          🇭🇹 Commencer gratuitement — C&apos;est pour Haïti
        </Link>
        <div style={{ marginTop: 18, fontSize: 13, color: '#9ca3af' }}>Gratuit pour les acheteurs haïtiens · Aucune carte bancaire requise</div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111827', color: 'white', padding: '44px 5% 24px' }}>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginBottom: 36, maxWidth: 1280, margin: '0 auto 36px' }}>
          <div style={{ flex: '1 1 220px', minWidth: 180 }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>🌏 China-HT</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>La plateforme de sourcing dédiée aux entrepreneurs haïtiens qui importent depuis la Chine.</p>
          </div>
          {[
            { titre: 'Produits', liens: ['Textiles & Vêtements', 'Électronique', 'Construction', 'Énergie Solaire', 'Cosmétiques'] },
            { titre: 'Villes Chine', liens: ['Guangzhou', 'Yiwu', 'Shenzhen', 'Foshan', 'Dongguan'] },
            { titre: 'Services', liens: ['Agents terrain', 'Inspection qualité', 'Calcul logistique', 'Demandes de devis'] },
          ].map(col => (
            <div key={col.titre} style={{ flex: '1 1 130px' }}>
              <div style={{ fontWeight: 700, marginBottom: 14, color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>{col.titre}</div>
              {col.liens.map(l => <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2026 China-HT · Fait avec ❤️ pour Haïti 🇭🇹</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['🇭🇹 Français / Kreyòl', '🇨🇳 中文', '🇺🇸 English'].map(l => (
              <span key={l} style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
