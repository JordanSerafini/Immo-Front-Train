// For Strict Mode
// import React from 'react';

// === REACT DOM === //
import ReactDOM from 'react-dom/client';

// === REDUX === //
import { Provider } from 'react-redux';
import store from './store';

// === COMPONENTS === //
import App from './components/App/App';

// === STYLES === //
import './styles/index.scss';
import './styles/index.tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
