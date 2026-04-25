import "./Logo.scss";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../../assets/main-logo.png";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/");
      }}
      className='main-logo-container'
    >
      <img className='balisha' src={mainLogo} alt='main logo' />
      <p>Balisha</p>
    </div>
  );
}
