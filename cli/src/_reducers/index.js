import alert from './alert.reducer';
import authentication from './authentication.reducer';
import registration from  './registration.reducer';
import users from './users.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    alert ,
    authentication,
    registration,
    users
});

export default rootReducer;