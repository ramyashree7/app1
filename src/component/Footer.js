import { FaHeart } from 'react-icons/fa';
import "./Footer.css"
function Footer() {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()} made with
        <FaHeart style={{ color: 'red' }} /> by
      </small>
    </footer>

  );
}
export default Footer;
