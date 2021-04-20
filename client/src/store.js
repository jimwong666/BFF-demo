import { combineReducers } from 'redux-immutable';


import {reducer as workReducer} from '@pages/work';

const rootReducer = combineReducers({
    workReducer
});

export default rootReducer
