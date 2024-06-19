import { combineReducers } from 'redux';

// Пример редьюсера
const exampleReducer = (state = {}, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer
});

export default rootReducer;
