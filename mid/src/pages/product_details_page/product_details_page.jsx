import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './product_details_page.css'

function ProductDetailsPage() {
  const { id } = useParams()
  const [product, set_product] = useState(null)
  const [is_loading, set_is_loading] = useState(true)
  const [error_text, set_error_text] = useState('')

  useEffect(() => {
    const fetch_product = async() => {
      set_is_loading(true)
      set_error_text()
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error('Request failed')
        }
        const data = await response.json()
        set_product(data)
      } catch {
        set_error_text('Не найден описание. Попробуйте снова')
      } finally {
        set_is_loading(false)
      }
    }
    fetch_product()
  }, [id])

  const availability_status = product?.availabilityStatus ?? (product?.stock > 0 ? 'In Stock' : 'Out of Stock')

  return (
    <main className="details-page">
      <Link className="details-page_back" to="/">
        Back to catalog
      </Link>
      {is_loading && <p className="details-page_message">Loading...</p>}
      {!is_loading && error_text && <p className="details-page_error">{error_text}</p>}
      {!is_loading && !error_text && product && (
        <section className="details-card">
          <div className="details-card_image-wrap">
            <img
              className="details-card_image"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          <div className="details-card_content">
            <h1 className="details-card_title">{product.title}</h1>
            <p className="details-card_description">{product.description}</p>
            <div className="details-card_price-wrap">
              <span className="details-card_price">${product.price}</span>
              <span className="details-card_discount">
                -{product.discountPercentage}%
              </span>
            </div>
            <ul className="details-card_list">
              <li className="details-card_item">
                <span className="details-card_label">Рейтинг</span>
                <span className="details-card_value">{product.rating}</span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Бренд</span>
                <span className="details-card_value">{product.brand}</span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Категория</span>
                <span className="details-card_value">{product.category}</span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">В наличии</span>
                <span className="details-card_value">{product.stock}</span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Вес</span>
                <span className="details-card_value">{product.weight}</span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Доступность</span>
                <span className="details-card_value details-card_value_status">
                  {availability_status}
                </span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Описание</span>
                <span className="details-card_value">{product.description}</span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Цена (зачем если она и так есть, но по заданию добавил)</span>
                <span className="details-card_value">${product.price}</span>  
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Скидка</span>
                <span className="details-card_value">{product.discountPercentage}%</span>
              </li>
              <li className="details-card_item">
                <span className="details-card_label">Название</span>
                <span className="details-card_value">{product.title}</span>
              </li>
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}

export default ProductDetailsPage

