import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

function Field({ name, label, type = 'text', required, textarea, autoComplete }) {
  const baseStyle = {
    width: '100%',
    padding: '12px 14px',
    background: '#FFFFFF',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 4,
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#1A1A1A',
    outline: 'none',
    boxSizing: 'border-box',
  }
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span style={{
        fontFamily: "'League Spartan', sans-serif",
        fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.7)',
      }}>
        {label}{required && ' *'}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          style={{ ...baseStyle, resize: 'vertical', minHeight: 110, fontFamily: baseStyle.fontFamily }}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          style={baseStyle}
        />
      )}
    </label>
  )
}

export default function ContactModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    const onOpen = () => {
      setStatus('idle')
      setErrMsg('')
      setOpen(true)
    }
    window.addEventListener('open-contact', onOpen)
    return () => window.removeEventListener('open-contact', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ENDPOINT) {
      setStatus('error')
      setErrMsg('Contact endpoint not configured. Set VITE_CONTACT_ENDPOINT in .env.local')
      return
    }
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        const msg = json?.errors?.[0]?.message || json?.error || 'Submission failed. Please try again.'
        setStatus('error')
        setErrMsg(msg)
      }
    } catch {
      setStatus('error')
      setErrMsg('Network error. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '6vh 5vw',
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#F5C518',
              padding: 'clamp(1.75rem, 4vw, 2.75rem)',
              width: '100%',
              maxWidth: 560,
              position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.45)',
              borderRadius: 0,
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(0,0,0,0.9)',
                color: '#FFFFFF',
                border: 'none',
                width: 36, height: 36, borderRadius: 9999,
                cursor: 'pointer', fontSize: 20, fontWeight: 700, lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </button>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <p style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.55)', marginBottom: '1rem',
                }}>Confirmed</p>
                <h3 style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
                  fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                }}>
                  Thank you!
                </h3>
                <p style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: '1rem', fontWeight: 700,
                  color: '#1A1A1A', maxWidth: 360, margin: '0 auto 1.75rem',
                  lineHeight: 1.5,
                }}>
                  Your message has been sent. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="btn-pill btn-pill-dark"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <>
                <p style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.55)', marginBottom: '0.65rem',
                }}>Get in touch</p>
                <h3 style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  marginBottom: '1.5rem',
                }}>
                  Contact sales.
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Field name="fullName" label="Full name" required autoComplete="name" />
                  <Field name="email" label="Work email" type="email" required autoComplete="email" />
                  <Field name="company" label="Company" required autoComplete="organization" />
                  <Field name="message" label="Message" required textarea />

                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off"
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

                  {status === 'error' && (
                    <p style={{
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: '0.85rem', fontWeight: 700,
                      color: '#7A0014',
                      background: 'rgba(255,255,255,0.7)',
                      padding: '8px 12px', borderRadius: 4,
                    }}>{errMsg || 'Something went wrong.'}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-pill btn-pill-dark"
                    style={{
                      marginTop: 6,
                      opacity: status === 'sending' ? 0.6 : 1,
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                    }}
                  >
                    {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
