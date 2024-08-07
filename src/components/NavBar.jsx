import { Link, useLocation } from 'react-router-dom';
import Group313 from './../assets/Group 313.svg';
import Group309 from './../assets/Group 309.svg';
import SearchIcon from './../assets/search.svg';
import UserIcon from './../assets/Group 254.svg';
import Search  from './../assets/Capture_d_écran_2024-08-07_095510-removebg-preview.png';

const Navbar = () => {
  const location = useLocation();
  const ariane = location.pathname;
  const newPath = ariane.replace("/", "");
  console.log(newPath);

  return (
<nav>
  <Link to="/">
  {newPath === "search" ? <img src={Group309} alt="Group 309 Logo" /> : <img src={Group313} alt="Group 313 Logo" />}
    
  </Link>
  <Link to="/search">
  {newPath === "search" ? <img className='search-color' src={Search} alt="Group 309 Logo" width={"35px"} /> : <img src={SearchIcon} alt="Search Icon" />}
  </Link>
  <Link to="/">
    <img src={UserIcon} alt="User Icon" />
  </Link>
</nav>
  )

}




export default Navbar;
