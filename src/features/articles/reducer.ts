import { Reducer } from 'redux'
import Types from 'Types'
import { ActionType } from 'typesafe-actions'
import * as articles from './actions'
import * as C from './constants'

export type ArticleListAction = ActionType<typeof articles>

export type ArticleListState = {
  readonly documents: Types.AppDocument[]
  readonly isLoading: boolean
  readonly error: Error | null
}

const initialState: ArticleListState = {
  documents: [],
  isLoading: false,
  error: null,
}

const reducer: Reducer<ArticleListState, ArticleListAction> = (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_START:
      return { ...state, isLoading: true, error: null }
    case C.FETCH_SUCCESS:
      return { ...state, isLoading: false, documents: action.payload }
    case C.FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload, documents: [] }
    default:
      return state
  }
}

export default reducer
