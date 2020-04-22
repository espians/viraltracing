import _ from 'lodash'
import qs from 'query-string'

import { redirectToPage } from '../../utils/functions'

export const middleware = () => next => async (req, res) => {
  try {
    await next(req, res)
  } catch (err) {
    const contentTypeHeader = _.get(req, 'headers.content-type', '')

    if (contentTypeHeader && contentTypeHeader.includes('application/json')) {
      res.status(500)
      res.json({ error: err.message })
    } else {
      const qry = qs.stringify({
        msg: err.message,
      })

      redirectToPage({ res }, `/_error?${qry}`)
    }
  }
}
