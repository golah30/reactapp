import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './ducks';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import helpMiddleware from './middlewares/helpMiddleware';
import authMiddleware from './middlewares/authMiddleware';

const sagaMiddleware = createSagaMiddleware();

export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, helpMiddleware, authMiddleware),
      window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
