import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div style={{padding:'24px 16px',textAlign:'center'}}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div style={{marginTop:12}}>
        <Link to="/">Go Home</Link>
        <span> · </span>
        <Link to="/products/poo-gone">Shop Product</Link>
      </div>
    </div>
  )
}
