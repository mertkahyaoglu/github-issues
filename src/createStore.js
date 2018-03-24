import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './ducks';

export function configureStore() {
  let store = createStore(
    combineReducers({
      ...reducers,
    }),
    compose(
      applyMiddleware(thunkMiddleware),
      typeof global.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? global.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  return { store };
}

export default configureStore().store;
