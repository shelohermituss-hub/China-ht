'use client'
import Link from 'next/link'
import { STATS_DASHBOARD, COMMANDES, TENDANCE_COMMANDES, CATEGORIES, formatUSD, formatHTG, USD_TO_HTG } from '@/lib/data'

const STATUT_STYLE: Record<string, { label: string; bg: string; color: string }> = {
  transit:     { label: '🚢 En transit',       bg: '#eff6ff', color: '#2a85ff' },
  delivered:   { label: '✅ Livré',             bg: '#f0fdf4', color: '#10b981' },
  production:  { label: '🏭 Production',        bg: '#fff7ed', color: '#f97316' },
  pending:     { label: '⏳ En attente',        bg: '#fafafa', color: '#6b7280' },
  negotiating: { label: '🤝 Négociation',       bg: '#fdf4ff', color: '#8b5cf6' },
}

export default function DashboardPage() {
  const maxVal = Math.max(...TENDANCE_COMMANDES.map(t => t.montant), 1)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Welcome banner */}
      <div style={{ background: 'linear-gradient(135deg, #003087, #1a1a4e)', borderRadius: 14, padding: '22px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>🇭🇹 Bienvenue sur China-HT</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>Bonjour, Jean Dupont 👋</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '6px 0 0' }}>
            Prochaine livraison estimée : <strong style={{ color: 'white' }}>10 juillet 2026</strong> · Port-au-Prince
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/demandes/nouvelle" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#e63946', color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            + Nouvelle demande
          </Link>
          <Link href="/catalogue" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: 'rgba(255,255,255,0.12)', color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
            Explorer le catalogue
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { titre: 'Total importé', val: formatUSD(STATS_DASHBOARD.totalCommandesUSD), sous: formatHTG(STATS_DASHBOARD.totalCommandesUSD), ico: '💰', color: '#2a85ff', tendance: { dir: 'up', val: '+38%' } },
          { titre: 'Commandes en cours', val: STATS_DASHBOARD.commandesEnCours, sous: `${STATS_DASHBOARD.commandesLivrees} livrées au total`, ico: '📦', color: '#f97316', tendance: null },
          { titre: 'Fournisseurs actifs', val: STATS_DASHBOARD.fournisseursActifs, sous: 'Tous vérifiés SGS', ico: '🏭', color: '#10b981', tendance: { dir: 'up', val: '+2 ce mois' } },
          { titre: 'Économies réalisées', val: formatUSD(STATS_DASHBOARD.economiesRealisees), sous: 'vs prix Alibaba standard', ico: '📉', color: '#8b5cf6', tendance: { dir: 'up', val: '16% discount' } },
          { titre: 'Demandes RFQ actives', val: STATS_DASHBOARD.demandesRFQ, sous: '3 réponses reçues aujourd\'hui', ico: '📝', color: '#e63946', tendance: null },
        ].map(s => (
          <div key={s.titre} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{s.titre}</span>
              <span style={{ width: 36, height: 36, borderRadius: 9, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{s.ico}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{s.sous}</div>
            {s.tendance && (
              <div style={{ marginTop: 8, fontSize: 11, color: s.tendance.dir === 'up' ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {s.tendance.dir === 'up' ? '▲' : '▼'} {s.tendance.val}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 24 }}>
        {/* Chart */}
        <div style={{ background: 'white', borderRadius: 12, padding: '20px 24px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Volume d&apos;importations 2026</h3>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: '4px 0 0' }}>Montant en USD par mois</p>
            </div>
            <span style={{ fontSize: 11, background: '#eff6ff', color: '#2a85ff', padding: '3px 10px', borderRadius: 99, fontWeight: 600 }}>Janvier – Juin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
            {TENDANCE_COMMANDES.map(t => (
              <div key={t.mois} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 10, color: '#2a85ff', fontWeight: 700 }}>{t.montant > 0 ? `$${(t.montant/1000).toFixed(1)}k` : ''}</div>
                <div style={{ width: '100%', background: t.montant > 0 ? '#2a85ff' : '#f3f4f6', borderRadius: '4px 4px 0 0', height: `${(t.montant / maxVal) * 100}%`, minHeight: t.montant > 0 ? 8 : 0, maxHeight: 110 }} />
                <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{t.mois}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px', background: '#f9fafb', borderRadius: 8, display: 'flex', gap: 20 }}>
            <div><div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>{formatUSD(STATS_DASHBOARD.totalCommandesUSD)}</div><div style={{ fontSize: 11, color: '#9ca3af' }}>Total 2026</div></div>
            <div><div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>{STATS_DASHBOARD.volumeImporte}</div><div style={{ fontSize: 11, color: '#9ca3af' }}>Volume importé</div></div>
            <div><div style={{ fontSize: 18, fontWeight: 800, color: '#f59e0b' }}>{STATS_DASHBOARD.portPAP.delaiMoyen}j</div><div style={{ fontSize: 11, color: '#9ca3af' }}>Délai moyen</div></div>
          </div>
        </div>

        {/* Alertes et taux */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Taux change */}
          <div style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>💱 Taux de change BRH</h3>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#111827' }}>130.73 <span style={{ fontSize: 16, color: '#6b7280' }}>HTG/USD</span></div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4, marginBottom: 14 }}>Banque de la République d&apos;Haïti · Aujourd&apos;hui</div>
            <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, marginBottom: 8 }}>Conversions rapides</div>
              {[100, 500, 1000, 5000].map(usd => (
                <div key={usd} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: '#6b7280' }}>${usd} USD</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>{(usd * USD_TO_HTG).toLocaleString('fr')} HTG</span>
                </div>
              ))}
            </div>
          </div>
          {/* Port alert */}
          <div style={{ background: '#fff7ed', borderRadius: 12, padding: '16px 18px', border: '1px solid #fed7aa' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#9a3412', marginBottom: 4 }}>Alerte Port-au-Prince</div>
                <div style={{ fontSize: 13, color: '#c2410c', lineHeight: 1.5 }}>Congestion modérée — délai additionnel estimé +3 jours pour les arrivées semaine du 5 juil.</div>
                <div style={{ fontSize: 11, color: '#ea580c', marginTop: 8, fontWeight: 500 }}>Source: AGD · Il y a 5h</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commandes récentes */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Commandes récentes</h3>
          <Link href="/commandes" style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Voir toutes →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Réf.', 'Fournisseur', 'Produit', 'Montant', 'Statut', 'Progression', 'Livraison'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMMANDES.map((cmd, i) => {
                const st = STATUT_STYLE[cmd.statutCode] || STATUT_STYLE.pending
                return (
                  <tr key={cmd.id} style={{ borderBottom: i < COMMANDES.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '14px 16px', fontSize: 12, fontWeight: 700, color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>
                      <Link href={`/commandes/${cmd.id}`} style={{ textDecoration: 'none', color: 'var(--color-primary)' }}>{cmd.id}</Link>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', whiteSpace: 'nowrap', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>{cmd.fournisseur.split(' ').slice(0, 2).join(' ')}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cmd.produit}</td>
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{formatUSD(cmd.montantUSD)}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatHTG(cmd.montantUSD)}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, background: st.bg, color: st.color, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{st.label}</span>
                    </td>
                    <td style={{ padding: '14px 16px', minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 5, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${cmd.progression}%`, background: cmd.progression === 100 ? '#10b981' : '#2a85ff', borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, whiteSpace: 'nowrap' }}>{cmd.progression}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>
                      {cmd.dateLivraisonEstimee ? new Date(cmd.dateLivraisonEstimee).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
        {[
          { ico: '📝', titre: 'Nouvelle demande RFQ', desc: 'Envoyez votre besoin à plusieurs fournisseurs', href: '/demandes/nouvelle', color: '#2a85ff' },
          { ico: '🏭', titre: 'Trouver un fournisseur', desc: 'Parcourez l\'annuaire vérifié', href: '/fournisseurs', color: '#10b981' },
          { ico: '🚢', titre: 'Calculer les coûts', desc: 'Estimez fret + taxes haïtiennes', href: '/logistique', color: '#f59e0b' },
          { ico: '🤝', titre: 'Réserver un agent', desc: 'Agent bilingue en Chine pour vous', href: '/agents', color: '#8b5cf6' },
        ].map(a => (
          <Link key={a.href} href={a.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', borderRadius: 12, padding: '16px 18px', border: '1.5px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = a.color; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${a.color}20` }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{a.ico}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{a.titre}</div>
              <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{a.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
