// SSG Pgage
import { useRouter } from 'next/router'

import fetcher from '@/shared/fetcher'

// The page component receives products prop
// from getStaticProps
const ProductDetailPage = ({ product }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <h1 className="py-4 text-4xl font-bold">Product Detail (SSG Pgage)</h1>

      <img className="w-20 h-20 mr-4" src={product.image} />
      <h1 className="py-1 text-2xl">{product.name}</h1>
      <span>{product.description}</span>
      <span>Price: {product.price}</span>
    </div>
  )
}

export default ProductDetailPage

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

// This function runs at build time on the build server
export async function getStaticProps({ params }) {
  const product = await fetcher(`http://localhost:3000/api/products/${params.slug}`)
  return {
    props: {
      product
    },
    revalidate: 60
  }
}
