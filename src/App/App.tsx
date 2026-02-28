import Header from 'components/Header';
import { Outlet } from 'react-router';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
