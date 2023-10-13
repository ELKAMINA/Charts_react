import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import projectReducer from './Projects/projectSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  project: projectReducer,
});

export { rootPersistConfig, rootReducer };
