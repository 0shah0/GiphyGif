import { applyMiddleware, compose, createStore, Store, StoreEnhancer } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import reducers from "./reducers";
import { rootSaga } from "./sagas/index";

const saga: SagaMiddleware = createSagaMiddleware();
const enhancer: StoreEnhancer = compose(applyMiddleware(saga));
const store:Store = createStore(reducers, enhancer);

saga.run(rootSaga);

export default store;