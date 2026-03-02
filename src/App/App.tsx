import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from 'components/Header';
import { Outlet } from 'react-router';
import './App.scss';

const queryClint = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClint}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
