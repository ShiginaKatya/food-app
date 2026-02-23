import { Outlet } from 'react-router';
import './App.scss'
import Header from 'components/Header';


function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  )
};

export default App
