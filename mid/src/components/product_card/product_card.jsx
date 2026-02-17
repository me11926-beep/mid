import { Link } from 'react-router-dom'
import './product_card.css'

function ProductCard({ product }) {
  return (
    <Link className="product-card" to={`/products/${product.id}`}>
      <img
        className="product-card_image"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="product-card_body">
        <h2 className="product-card_title">{product.title}</h2>
        <p className="product-card_category">{product.category}</p>
        <div className="product-card_meta">
          <span className="product-card_price">${product.price}</span>
          <span className="product-card_rating">{product.rating}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

