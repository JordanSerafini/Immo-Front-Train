// For Strict Mode
import React from 'react';

// React
import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Components
import App from './components/App/App';

// Styles
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
