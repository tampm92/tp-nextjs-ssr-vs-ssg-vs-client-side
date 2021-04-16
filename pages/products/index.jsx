// SSR page
import Link from 'next/link'

import fetcher from '@/shared/fetcher'

// The page component receives products prop
// from getServerSideProps
const ProductsPage = ({ products }) => {
  return (
    <div className="flex flex-col">
      <h1 className="py-4 text-4xl font-bold">Products (SSR Page)</h1>
      <ul>
        {products && products.map((product) => (
          <li key={product.id} className="flex flex-wrap py-2">
            <img className="w-10 h-10 mr-4" src={product.image} />
            <Link href={`/products/${product.slug}`}>
              <a className="hover:text-green-500">{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage

// This function runs at build time on the build server
export async function getServerSideProps() {
  const products = await fetcher('http://localhost:3000/api/products')
  return {
    props: {
      products
    }
  }
}