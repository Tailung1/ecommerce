import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../MyContext";
import mainLogo from "../../assets/main-logo.png"

export default function Logo() {
  const navigate = useNavigate();
  const { setShowSearchBar } = useMyContext();

  return (
    <div
      onClick={() => {
        navigate("/");
        setShowSearchBar(false);
      }}
      className='main-logo-container'
    >
      <img className='balisha' src={mainLogo} alt='main logo' />
      <p>Balisha</p>
    </div>
  );
}
