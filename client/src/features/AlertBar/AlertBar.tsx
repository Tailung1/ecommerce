import "./AlertBar.scss";
import { useMyContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";
import exitBtn from "../../assets/reject.png";
import rejectIcon from "../../assets/reject.png";
import phoneImage from "../../assets/iphone.png";

export default function WarningBar() {
  const navigate = useNavigate();

  const { isExitingBar, isChosen, isFull, setIsExitingBar, setShowAlert, compareCart } =
    useMyContext();

  const handleExit = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowAlert(false);
      setIsExitingBar(false);
    }, 600);
  };

  const handleReject = () => {
    setShowAlert(false);
    navigate("/compare-products");
    return;
  };

  return (
    <div className={`Bar bar-modifed-warning ${isExitingBar && "ExitBar"}`}>
      <img
        src={exitBtn}
        onClick={handleExit}
        className='exit-btn exit-btn-warning w-10 h-8'
        alt='Exit icon'
      />
      <div className='warning-container'>
        <h2>{isChosen ? "Warning!" : "Compare"}</h2>
        <hr />
      </div>
      {isChosen ? (
        <p className='warning-reason-text'>Product is already chosen</p>
      ) : (
        <div className='flex flex-col  items-center  gap-5 w-full'>
          <p className='text-red-600 text-[22px]'>
            {isFull ? "You already have 4 products" : "Product adding is impossible"}
          </p>
          <p className='text-gray-500 text-[20px] text-center'>
            {isFull
              ? "To add a new product, or remove one of them"
              : "Please choose another product from a different category or remove it"}
          </p>
          <section className='compare-products-parent'>
            {compareCart
              .filter((item) => item !== null)
              .map((prod) => (
                <div key={Math.random() * 2372} className='product-container'>
                  <div>
                    <img src={phoneImage} alt='phone image' />
                    <p>{prod?.name}</p>
                  </div>
                  <img onClick={handleReject} src={rejectIcon} alt='Reject icon' />
                </div>
              ))}
          </section>{" "}
        </div>
      )}

      <button onClick={handleExit}>It is clear</button>
    </div>
  );
}
