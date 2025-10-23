import { useEffect } from 'react'
import Checkout from '../pages/Checkout.jsx'

export default function CheckoutModal({ open, onClose }){
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="pg-modal-root" onClick={onClose}>
      <style>{css}</style>
      <div className="pg-modal-dialog" role="dialog" aria-modal="true" aria-label="Checkout" onClick={(e)=>e.stopPropagation()}>
        <button className="pg-modal-close" aria-label="Close checkout" onClick={onClose}>✕</button>
        <div className="pg-modal-body">
          <Checkout />
        </div>
      </div>
    </div>
  )
}

const css = `
.pg-modal-root { position:fixed; inset:0; background:rgba(15,23,42,0.5); display:flex; align-items:center; justify-content:center; z-index:70; padding:16px; }
.pg-modal-dialog { position:relative; width:min(1100px, 100%); max-height:90vh; overflow:auto; background:#fff; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.25); }
.pg-modal-close { position:sticky; top:0; right:0; margin-left:auto; display:block; background:#fff; border:none; font-size:18px; padding:10px 12px; cursor:pointer; }
.pg-modal-body { padding:8px 8px 16px; }
@media (max-width: 900px){ .pg-modal-dialog { max-height:95vh; } }
`
