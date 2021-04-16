// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dumbData from '@/shared/dumbData'

export default (req, res) => {
  const { slug } = req.query
  const product = dumbData.products.find(product => product.slug === slug)
  if(product) {
    return res.status(200).json(product)
  } else {
    res.status(404).json({message: 'Not Found'})
  }
}
