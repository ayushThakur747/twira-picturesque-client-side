import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';//reducers where our logic resides ,how a state should be changed

import App from './App';

//creating store which will contain our global state
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    {/*provider component is used so that we can pass global state STORE to our react app  */}
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


