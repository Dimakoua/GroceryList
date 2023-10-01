import { combineReducers } from 'redux'
import ListsReducer from './lists'
import FilterReducer from './filters'
import ActiveListReducer from './activeList'

export default combineReducers({
    lists: ListsReducer,
    activeList: ActiveListReducer,
    filters: FilterReducer,
})
