import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { Persistor } from './redux/store';
import history from './services/history';
import { Routes } from './routes';
import { Header } from './components/Header';
import GlobalStyles from './styles/GlobalStyles';

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}
