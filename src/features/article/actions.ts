import { Dispatch } from 'redux'
import Types from 'Types'
import { action } from 'typesafe-actions'
import * as C from './constants'

export const fetchStart = () => action(C.FETCH_START)
export const fetchSuccess = (document: Types.AppDocument) => action(C.FETCH_SUCCESS, document)
export const fetchError = (error: Error) => action(C.FETCH_ERROR, error)

export type FetchActions = ReturnType<typeof fetchStart | typeof fetchSuccess | typeof fetchError>

export const fetchArticle = (dispatch: Dispatch<FetchActions>) => (
  publication: string,
  article: string,
) => {
  dispatch(fetchStart())
  fetch(`${process.env.REACT_APP_API_URL}/${publication}/${article}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`)
      }
      return res
    })
    .then(res => res.json())
    .then((document: Types.AppDocument) => {
      dispatch(fetchSuccess(document))
    })
    .catch((error: Error) => {
      dispatch(fetchError(error))
    })
}
