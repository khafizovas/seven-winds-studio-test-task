import { Provider } from 'react-redux';

import { Home } from 'src/pages';

import { store } from './store';
import './App.style.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
