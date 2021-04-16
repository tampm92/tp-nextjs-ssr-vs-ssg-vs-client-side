// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dumbData from '@/shared/dumbData'

export default (req, res) => {
  return res.status(200).json(dumbData.products)
}
