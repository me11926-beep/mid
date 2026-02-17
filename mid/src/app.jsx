import { Navigate, Route, Routes } from 'react-router-dom'
import ProductDetailsPage from './pages/product_details_page/product_details_page.jsx'
import ProductsPage from './pages/products_page/products_page.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

