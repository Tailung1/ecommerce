import "./AlertBar.scss";
import { useMyContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";
import exitBtn from "../../assets/reject.png";
import rejectIcon from "../../assets/reject.png";
import phoneImage from "../../assets/iphone.png";
import { useBarDispatch } from "../../contexts/BarContext";
import { useBarStateValue } from "../../contexts/BarContext";

export default function AlertBar() {
  const navigate = useNavigate();
  const { setBar, setAlert } = useBarDispatch();
  const isCompareCartFull = useBarStateValue("alert").isFull;
  const isProductChosen = useBarStateValue("alert").isChosen;
  const isExitingBar = useBarStateValue("isExitingBar");

  const { compareCart } = useMyContext();

  const handleReject = () => {
    setAlert("showAlert", false);
    navigate("/compare-products");
    return;
  };

  return (
    <div
      onAnimationEnd={(e) => {
        // Checking isExitingBar is redundant in this case,
        // but useful if there are multiple animations on this element.

        if (isExitingBar && e.animationName === "BarOut") {
          setAlert("showAlert", false);
          setBar("isExitingBar", false);
        }
      }}
      className={`Bar bar-modifed-warning ${isExitingBar && "ExitBar"}`}
    >
      <img
        src={exitBtn}
        onClick={() => setBar("isExitingBar", true)}
        className='exit-btn exit-btn-warning w-10 h-8'
        alt='Exit icon'
      />
      <div className='warning-container'>
        <h2>{isProductChosen ? "Warning!" : "Compare"}</h2>
        <hr />
      </div>
      {isProductChosen ? (
        <p className='warning-reason-text'>Product is already chosen</p>
      ) : (
        <div className='flex flex-col  items-center  gap-5 w-full'>
          <p className='text-red-600 text-[22px]'>
            {isCompareCartFull ? "You already have 4 products" : "Product adding is impossible"}
          </p>
          <p className='text-gray-500 text-[20px] text-center'>
            {isCompareCartFull
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

      <button onClick={() => setBar("isExitingBar", true)}>It is clear</button>
    </div>
  );
}
