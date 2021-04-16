// Client-side Pgage
import useSWR from 'swr'
import Link from 'next/link'

import fetcher from '@/shared/fetcher'

// The page component receives products
// from fetching on client
const CartPage = ({}) => {
  // fetchAPI is the function to do data fetching
  const { data: products, error } = useSWR('/api/cart', fetcher)

  if (error) return <div>failed to load</div>
  if (!products) return <div>loading...</div>

  return (
    <div className="flex flex-col">
      <h1 className="py-4 text-4xl font-bold">Product Detail (SSG Pgage)</h1>

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

export default CartPage
