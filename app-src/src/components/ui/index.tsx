'use client'
import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
}
export function Button({ variant = 'primary', size = 'md', loading, icon, iconRight, children, className = '', ...props }: ButtonProps) {
  const v = { primary: 'btn-primary', accent: 'btn-accent', outline: 'btn-outline', ghost: 'btn-ghost' }[variant]
  const s = { sm: 'btn-sm', md: '', lg: 'btn-lg', xl: 'btn-xl' }[size]
  return (
    <button className={`btn ${v} ${s} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? <Spinner size="sm" color="white" /> : icon}
      {children}
      {iconRight && !loading && iconRight}
    </button>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', padding = true }: { children: ReactNode; className?: string; padding?: boolean }) {
  return <div className={`card ${!padding ? '!p-0' : ''} ${className}`}>{children}</div>
}

// ─── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'gray' | 'accent'
export function Badge({ children, variant = 'primary', dot }: { children: ReactNode; variant?: BadgeVariant; dot?: boolean }) {
  return (
    <span className={`badge badge-${variant}`}>
      {dot && <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; hint?: string; icon?: ReactNode; error?: string }
export function Input({ label, hint, icon, error, className = '', ...props }: InputProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-400)', display: 'flex' }}>{icon}</span>}
        <input className={`input ${icon ? 'pl-9' : ''} ${error ? 'border-red-500' : ''} ${className}`} style={icon ? { paddingLeft: 36 } : {}} {...props} />
      </div>
      {hint && !error && <p className="form-hint">{hint}</p>}
      {error && <p className="form-hint" style={{ color: 'var(--color-error)' }}>{error}</p>}
    </div>
  )
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; hint?: string }
export function Textarea({ label, hint, className = '', ...props }: TextareaProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea className={`input ${className}`} style={{ minHeight: 100, resize: 'vertical' }} {...props} />
      {hint && <p className="form-hint">{hint}</p>}
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label?: string; hint?: string; options: { value: string; label: string }[] }
export function Select({ label, hint, options, className = '', ...props }: SelectProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select className={`input ${className}`} {...props}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <p className="form-hint">{hint}</p>}
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 'md', color }: { size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const s = { sm: 16, md: 24, lg: 36 }[size]
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.7s linear infinite', color: color || 'var(--color-primary)' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ initiales, couleur = '#2a85ff', size = 'md', src }: { initiales: string; couleur?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; src?: string }) {
  const s = { sm: 'avatar-sm', md: 'avatar-md', lg: 'avatar-lg', xl: 'avatar-xl' }[size]
  if (src) return <img src={src} alt={initiales} className={`avatar ${s}`} style={{ objectFit: 'cover' }} />
  return (
    <span className={`avatar ${s}`} style={{ background: couleur + '22', color: couleur, fontWeight: 700 }}>
      {initiales}
    </span>
  )
}

// ─── Progress ─────────────────────────────────────────────────────────────────
export function Progress({ value, color, label }: { value: number; color?: string; label?: string }) {
  return (
    <div>
      {label && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--color-gray-600)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--color-gray-500)' }}>{value}%</span>
      </div>}
      <div className="progress-track">
        <div className="progress-bar" style={{ width: `${value}%`, background: color || 'var(--color-primary)' }} />
      </div>
    </div>
  )
}

// ─── Stars ────────────────────────────────────────────────────────────────────
export function Stars({ note, max = 5 }: { note: number; max?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(note) ? '#f59e0b' : 'none'} stroke={i < Math.round(note) ? '#f59e0b' : '#d4d4d4'} strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="divider" />
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '1rem 0' }}>
      <div className="divider" style={{ flex: 1, margin: 0 }} />
      <span style={{ fontSize: 12, color: 'var(--color-gray-400)', whiteSpace: 'nowrap' }}>{label}</span>
      <div className="divider" style={{ flex: 1, margin: 0 }} />
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ titre, valeur, sousValeur, icone, couleur = '#2a85ff', tendance }: {
  titre: string; valeur: string | number; sousValeur?: string; icone: ReactNode; couleur?: string; tendance?: { direction: 'up' | 'down'; valeur: string }
}) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--color-gray-500)', fontWeight: 500 }}>{titre}</span>
        <span style={{ width: 38, height: 38, borderRadius: 10, background: couleur + '1a', color: couleur, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icone}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--color-gray-900)', lineHeight: 1.2 }}>{valeur}</div>
      {sousValeur && <div style={{ fontSize: 12, color: 'var(--color-gray-400)', marginTop: 4 }}>{sousValeur}</div>}
      {tendance && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
          <span style={{ fontSize: 12, color: tendance.direction === 'up' ? 'var(--color-success)' : 'var(--color-error)', fontWeight: 600 }}>
            {tendance.direction === 'up' ? '▲' : '▼'} {tendance.valeur}
          </span>
          <span style={{ fontSize: 12, color: 'var(--color-gray-400)' }}>vs mois dernier</span>
        </div>
      )}
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icone, titre, description, action }: { icone: string; titre: string; description: string; action?: ReactNode }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icone}</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: 8 }}>{titre}</h3>
      <p style={{ fontSize: 14, color: 'var(--color-gray-500)', maxWidth: 380, margin: '0 auto', lineHeight: 1.6 }}>{description}</p>
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  )
}

// ─── Tag list ─────────────────────────────────────────────────────────────────
export function TagList({ items, couleur }: { items: string[]; couleur?: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {items.map(item => (
        <span key={item} style={{ padding: '2px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: (couleur || '#2a85ff') + '15', color: couleur || 'var(--color-primary)' }}>
          {item}
        </span>
      ))}
    </div>
  )
}
