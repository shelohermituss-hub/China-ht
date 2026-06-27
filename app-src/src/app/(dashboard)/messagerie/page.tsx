'use client'
import { useState } from 'react'
import { MESSAGES } from '@/lib/data'

export default function MessageriePage() {
  const [convActive, setConvActive] = useState(MESSAGES[0].id)
  const [msg, setMsg] = useState('')
  const [messagesLocaux, setMessagesLocaux] = useState(MESSAGES)

  const conv = messagesLocaux.find(m => m.id === convActive)!

  const envoyer = () => {
    if (!msg.trim()) return
    setMessagesLocaux(prev => prev.map(c => c.id === convActive ? {
      ...c,
      messages: [...c.messages, { id: c.messages.length + 1, auteur: 'moi', texte: msg, heure: new Date().toISOString(), lu: true }],
      dernierMessage: msg,
      heureMessage: 'À l\'instant',
    } : c))
    setMsg('')
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Messagerie 💬</h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Communiquez directement avec vos fournisseurs chinois</p>
      </div>

      <div style={{ background: 'white', borderRadius: 14, border: '1.5px solid #e5e7eb', overflow: 'hidden', height: 620, display: 'flex' }}>
        {/* Conversations list */}
        <div style={{ width: 300, borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Search */}
          <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid #f3f4f6' }}>
            <input placeholder="🔍 Rechercher..."
              style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box', background: '#f9fafb' }} />
          </div>

          {/* Conversations */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {messagesLocaux.map(c => (
              <div key={c.id} onClick={() => setConvActive(c.id)}
                style={{ padding: '14px 14px', cursor: 'pointer', background: convActive === c.id ? '#eff6ff' : 'white', borderLeft: `3px solid ${convActive === c.id ? 'var(--color-primary)' : 'transparent'}`, borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {/* Avatar */}
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: c.couleur + '20', color: c.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0, position: 'relative' }}>
                    {c.avatar}
                    {c.nonLus > 0 && (
                      <div style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: '#e63946', color: 'white', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.nonLus}</div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: c.nonLus > 0 ? 700 : 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.fournisseur.split(' ').slice(0, 2).join(' ')}</span>
                      <span style={{ fontSize: 11, color: '#9ca3af', flexShrink: 0, marginLeft: 4 }}>{c.heureMessage}</span>
                    </div>
                    <div style={{ fontSize: 12, color: c.nonLus > 0 ? '#374151' : '#9ca3af', fontWeight: c.nonLus > 0 ? 500 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.4 }}>{c.dernierMessage}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* New message prompt */}
            <div style={{ padding: '14px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
              <button style={{ fontSize: 13, color: 'var(--color-primary)', background: 'none', border: '1.5px dashed var(--color-primary)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>
                + Nouveau message
              </button>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: conv.couleur + '20', color: conv.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>{conv.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{conv.fournisseur}</div>
              <div style={{ fontSize: 12, color: '#10b981' }}>● En ligne</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '7px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, background: 'white', fontSize: 12, color: '#374151', cursor: 'pointer', fontWeight: 600 }}>📞 Appeler</button>
              <button style={{ padding: '7px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, background: 'white', fontSize: 12, color: '#374151', cursor: 'pointer', fontWeight: 600 }}>📎 Fichier</button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, background: '#f9fafb' }}>
            {/* Date separator */}
            <div style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', margin: '4px 0' }}>
              <span style={{ background: '#f3f4f6', padding: '3px 12px', borderRadius: 99 }}>Historique de conversation</span>
            </div>

            {conv.messages.map(m => {
              const isMoi = m.auteur === 'moi'
              return (
                <div key={m.id} style={{ display: 'flex', justifyContent: isMoi ? 'flex-end' : 'flex-start', gap: 8 }}>
                  {!isMoi && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: conv.couleur + '20', color: conv.couleur, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, flexShrink: 0, alignSelf: 'flex-end' }}>{conv.avatar}</div>
                  )}
                  <div style={{ maxWidth: '65%' }}>
                    <div style={{ padding: '10px 14px', borderRadius: isMoi ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: isMoi ? 'var(--color-primary)' : 'white', color: isMoi ? 'white' : '#111827', fontSize: 14, lineHeight: 1.5, border: isMoi ? 'none' : '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                      {m.texte}
                    </div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4, textAlign: isMoi ? 'right' : 'left', paddingLeft: isMoi ? 0 : 4 }}>
                      {m.heure.length > 10 ? m.heure.substring(11, 16) : m.heure}
                      {isMoi && <span style={{ marginLeft: 4, color: m.lu ? '#10b981' : '#9ca3af' }}>{m.lu ? '✓✓' : '✓'}</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div style={{ padding: '14px 16px', borderTop: '1px solid #e5e7eb', background: 'white' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div style={{ flex: 1, border: '1.5px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#f9fafb' }}>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); envoyer() } }}
                  placeholder="Tapez votre message... (Entrée pour envoyer)"
                  rows={2}
                  style={{ width: '100%', padding: '10px 14px', border: 'none', outline: 'none', fontSize: 14, resize: 'none', background: 'transparent', boxSizing: 'border-box' }} />
                <div style={{ padding: '4px 10px 8px', display: 'flex', gap: 8 }}>
                  {['😊', '📎', '🖼️'].map(icon => (
                    <button key={icon} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: '2px 4px', borderRadius: 4 }}>{icon}</button>
                  ))}
                </div>
              </div>
              <button onClick={envoyer}
                style={{ width: 44, height: 44, borderRadius: '50%', background: msg.trim() ? 'var(--color-primary)' : '#e5e7eb', color: msg.trim() ? 'white' : '#9ca3af', border: 'none', cursor: msg.trim() ? 'pointer' : 'default', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                ➤
              </button>
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6, textAlign: 'center' }}>
              💡 Conseil : Communiquez en anglais pour des réponses plus rapides des fournisseurs
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 20 }}>
        {[
          { icon: '🌐', title: 'Langue de communication', desc: 'L\'anglais est recommandé. Les fournisseurs Yiwu Global et SolarGreen parlent aussi le français.' },
          { icon: '⏰', title: 'Fuseau horaire', desc: 'La Chine est en UTC+8. Haïti est en UTC-4/-5. Décalage de 12-13h — planifiez vos messages!' },
          { icon: '📋', title: 'Modèles de messages', desc: 'Utilisez nos modèles prédéfinis pour les demandes de devis, négociations et suivis de commande.' },
        ].map(t => (
          <div key={t.title} style={{ background: 'white', borderRadius: 10, padding: '16px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: '8px 0 4px' }}>{t.title}</div>
            <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
