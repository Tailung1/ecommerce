import { useMyContext } from "../MyContext";
import leftArrowIcon from "../assets/left.png";
import plusIcon from "../assets/plus.png";
import binIcon from "../assets/bin.png";
import searchIcon from "../assets/search-icon.png";
import rejectIcon from "../assets/reject.png";

export default function Compare() {
  const {
    setShowCompareBar,
    selectedProductsToCompare,
    setSelectedProductsToCompare,
    setCompareIndex,
    compareIndex,
  } = useMyContext();

  const handleReset = () => {
    const hasAnyProduct = selectedProductsToCompare.some(
      (item) => item !== null
    );
    if (!hasAnyProduct) return;
    setSelectedProductsToCompare([null, null, null, null]);
    setCompareIndex(0);
  };

  const handleBarOpen = (id: number) => {
    if (compareIndex === 4) return;
    if (selectedProductsToCompare.find((item) => item?.id === id))
      return;

    setShowCompareBar(true);
  };
  const handleReject = (id: number) => {
    setSelectedProductsToCompare((prev) => {
      const filtred = selectedProductsToCompare.filter(
        (_, index) => index !== Number(id)
      );
      while (filtred.length < prev.length) {
        filtred.push(null);
      }
      return filtred;
    });
    setCompareIndex((prev) => prev - 1);
  };

  return (
    <div className='compare-container'>
      <div className='compare-header'>
        <div className='compare-navigation'>
          <div>
            <img src={leftArrowIcon} alt='Left arrow icon' />
            <p>Back</p>
          </div>
          <div onClick={handleReset}>
            <img src={binIcon} alt='bin icon' />
            <p>Clear</p>
          </div>
        </div>
        <hr className='compare-hr' />
      </div>
      <section className='compare-products-parent'>
        {selectedProductsToCompare.map((prod, index) => (
          <div
            key={Math.random() * 2372}
            onClick={() => handleBarOpen(prod?.id as number)}
            className='product-container'
          >
            {!prod ? (
              <div className='select-product-container'>
                <div className='select-product'>
                  <img src={plusIcon} alt='Plus icon' />
                  <span>Select product</span>
                </div>
              </div>
            ) : (
              <div className='flex gap-5'>
                <h1>name:{prod.name}</h1>{" "}
              </div>
            )}
            <img
              onClick={() => prod && handleReject(index)}
              src={prod ? rejectIcon : searchIcon}
              alt='Search icon'
            />
          </div>
        ))}
      </section>
    </div>
  );
}
