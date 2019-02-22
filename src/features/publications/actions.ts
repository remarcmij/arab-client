import { Dispatch } from 'redux'
import Types from 'Types'
import { action } from 'typesafe-actions'
import * as C from './constants'

export const fetchStart = () => action(C.FETCH_START)
export const fetchSuccess = (documents: Types.AppDocument[]) => action(C.FETCH_SUCCESS, documents)
export const fetchError = (error: Error) => action(C.FETCH_ERROR, error)

export type FetchActions = ReturnType<typeof fetchStart | typeof fetchSuccess | typeof fetchError>

export const fetchPublicationList = (dispatch: Dispatch<FetchActions>) => () => {
  dispatch(fetchStart())
  fetch(`${process.env.REACT_APP_API_URL}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`)
      }
      return res
    })
    .then(res => res.json())
    .then((documents: Types.AppDocument[]) => {
      dispatch(fetchSuccess(documents))
    })
    .catch((error: Error) => {
      dispatch(fetchError(error))
    })
}
