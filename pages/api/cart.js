// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _samplesize from 'lodash.samplesize'

import dumbData from '@/shared/dumbData'

export default (req, res) => {
  return res.status(200).json(_samplesize(dumbData.products, 5))
}
