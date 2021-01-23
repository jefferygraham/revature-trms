import React from 'react';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { StoreState, reducers } from '../reducers';
import { App } from '../components/App';

test('store is loaded when app renders', () => {
  const store: Store<StoreState> = createStore(
    reducers,
    applyMiddleware(thunk)
  );

  render(
    <Provider store={store}>
      <App></App>
    </Provider>
  );

  expect(store).toBeTruthy();
});
