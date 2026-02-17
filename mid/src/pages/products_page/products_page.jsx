import { useEffect, useState } from 'react'
import ProductList from '../../components/product_list/product_list.jsx'
import './products_page.css'

function ProductsPage() {
  const [products, set_products] = useState([])
  const [search_term, set_search_term] = useState('')
  const [is_loading, set_is_loading] = useState(false)
  const [error_text, set_error_text] = useState('')

  useEffect(() => {
    const timeout_id = setTimeout(() => {
      const fetch_products = async () => {
        set_is_loading(true)
        set_error_text()
        try {
          const endpoint = search_term.trim()
            ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search_term.trim())}`
            : 'https://dummyjson.com/products?limit=100'

          const response = await fetch(endpoint)
          if (!response.ok) {
            throw new Error('Request failed')
          }

          const data = await response.json()
          set_products(data.products)
        } catch {
          set_error_text('Не могу загрузить лист продуктов. Попробуйте завтра.')
        } finally {
          set_is_loading(false)
        }
      }
      fetch_products()
    }, 500)
    return () => clearTimeout(timeout_id)
  }, [search_term])

  const handle_search_change = (event) => {
    set_search_term(event.target.value)
  }

  return (
    <main className="products-page">
      <h1 className="products-page_title">Каталог продуктов</h1>

      <div className="products-page_search-wrap">
        <input
          className="products-page_search"
          type="text"
          placeholder="ПОиск продуктов..."
          value={search_term}
          onChange={handle_search_change}
        />
      </div>

      {is_loading && <p className="products-page_message">Взымается плата за просмотр...</p>}
      {!is_loading && error_text && <p className="products-page_error">{error_text}</p>}

      {!is_loading && !error_text && products.length === 0 && (
        <p className="products-page_message">Ждите</p>
      )}

      {!is_loading && !error_text && products.length > 0 && (
        <ProductList products={products} />
      )}
    </main>
  )
}

export default ProductsPage

