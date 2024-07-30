import "./css/App.css";
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';

const App = () => (
  <>
    <Outlet />
    <Navbar />
  </>
);

export default App;
