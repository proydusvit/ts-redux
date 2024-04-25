import { createStore } from 'redux';
import rootReducer from './reducers/rootState';

import { CartState } from './reducers/cartReducer';

// Определение типа для состояния хранилища
export interface RootState {
  cart: CartState;
}

// Создание и экспорт хранилища
const store = createStore(rootReducer);

export default store;
