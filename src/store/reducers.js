import { combineReducers } from 'redux'
import ListsReducer from './lists'
import ErrorsReducer from './errors'

export default combineReducers({
    lists: ListsReducer,
    errors: ErrorsReducer
})
