import { combineReducers } from 'redux'
import ListsReducer from './lists'
import FilterReducer from './filters'

export default combineReducers({
  lists: ListsReducer,
  filters: FilterReducer,
})
