import { useMyContext } from "../MyContext";
import exitBtn from "../assets/reject.png";
import rejectIcon from "../assets/reject.png";
import phoneImage from "../assets/iphone.png";

export default function WarningBar() {
  const {
    isExitingBar,
    isChosen,
    setIsChosen,
    setIsExitingBar,
    setShowWarningBar,
    warningMessage,
    selectedProductsToCompare,
    setSelectedProductsToCompare,
  } = useMyContext();

  const handleExit = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowWarningBar(false);
      setIsExitingBar(false);
      setIsChosen(false);
    }, 600);
  };

  const handleReject = (id: any) => {
    if (selectedProductsToCompare[1] == null) {
      setIsExitingBar(true);
      setTimeout(() => {
        setShowWarningBar(false);
        setIsExitingBar(false);
      }, 6000);
    }

    setSelectedProductsToCompare((prev) => {
      let newArr = [...prev];
      let filtred = newArr.filter((item) => item?.id !== id);
      while (filtred.length < newArr.length) {
        filtred.push(null);
      }
      return filtred;
    });
  };

  return (
    <div
      className={`Bar bar-modifed-warning ${
        isExitingBar && "ExitBar"
      }`}
    >
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
        <p className='warning-reason-text'>{warningMessage}</p>
      ) : (
        <div className='flex flex-col  items-center gap-2'>
          <p className='text-red-600 text-[20px]'>
            Product adding is impossible
          </p>
          <p className='text-gray-500'>
            Please choose another product from a different category or
            remove it
          </p>
          <section className='compare-products-parent'>
            {selectedProductsToCompare
              .filter((item) => item !== null)
              .map((prod) => (
                <div
                  key={Math.random() * 2372}
                  className='product-container'
                >
                  <div>
                    <img src={phoneImage} alt='phone image' />
                    <p>{prod?.name}</p>
                  </div>
                  <img
                    onClick={() => handleReject(prod?.id)}
                    src={rejectIcon}
                    alt='Reject icon'
                  />
                </div>
              ))}
          </section>{" "}
        </div>
      )}

      <button onClick={handleExit}>It is clear</button>
    </div>
  );
}
