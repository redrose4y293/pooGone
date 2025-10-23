import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <header style={{borderBottom:'1px solid #e5e7eb',padding:'12px 16px',display:'flex',gap:16,alignItems:'center',justifyContent:'space-between'}}>
        <Link to="/" style={{fontWeight:700,textDecoration:'none',color:'#0f172a'}}>Poo Gone®</Link>
        <nav style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <Link to="/products/poo-gone">Product</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main style={{flex:1}}>
        <Outlet />
      </main>

      <footer style={{borderTop:'1px solid #e5e7eb',padding:'16px'}}>
        <div style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',gap:12}}>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/refund-policy">Refund Policy</Link>
            <Link to="/sds">SDS</Link>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} style={{display:'flex',gap:8,alignItems:'center'}}>
            <input placeholder="Email sign-up" style={{padding:'8px 10px',border:'1px solid #cbd5e1',borderRadius:6}} />
            <button type="submit" style={{padding:'8px 12px',border:'1px solid #0ea5e9',background:'#0ea5e9',color:'#fff',borderRadius:6}}>Subscribe</button>
          </form>
        </div>
        <div style={{marginTop:8,fontSize:12,color:'#475569'}}>© {new Date().getFullYear()} Poo Gone®. All rights reserved.</div>
      </footer>

      <div style={{position:'fixed',right:12,bottom:12,background:'#fff',border:'1px solid #e5e7eb',borderRadius:8,padding:'6px 10px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>Poo Gone®</div>
    </div>
  )
}
