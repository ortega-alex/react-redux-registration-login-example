import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/index';
import App  from './App/App';

// setup fake backend
/*import { configureFakeBackend } from './_helpers';
configureFakeBackend();*/

console.log(store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);