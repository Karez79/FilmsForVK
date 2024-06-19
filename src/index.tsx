import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/store';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <div>Hello, React with TypeScript and Redux!</div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
