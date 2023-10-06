import { combineReducers } from 'redux'
import ListsReducer from './lists'

export default combineReducers({
    lists: ListsReducer
})
