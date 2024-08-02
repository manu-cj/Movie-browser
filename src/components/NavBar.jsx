import { Link } from 'react-router-dom';
import Group313 from './../assets/Group 313.svg';
import SearchIcon from './../assets/search.svg';
import UserIcon from './../assets/Group 254.svg';

const Navbar = () => (
<nav>
  <Link to="/">
    <img src={Group313} alt="Group 313 Logo" />
  </Link>
  <Link to="/search">
    <img src={SearchIcon} alt="Search Icon" />
  </Link>
  <Link to="/">
    <img src={UserIcon} alt="User Icon" />
  </Link>
</nav>
);

export default Navbar;
