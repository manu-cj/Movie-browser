import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';

const App = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);

export default App;
