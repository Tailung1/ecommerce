import { useMyContext } from "../MyContext";
import leftArrowIcon from "../assets/left.png";
import plusIcon from "../assets/plus.png";
import binIcon from "../assets/bin.png";
import searchIcon from "../assets/search-icon.png";


export default function Compare() {
  const {
    setShowCompareBar,
    selectedProductsToCompare,
    setSelectedProductsToCompare,
    setCompareIndex,
  } = useMyContext();

  const handleReset = () => {
    const hasAnyProduct = selectedProductsToCompare.some(
      (item) => item !== null
    );
    if (hasAnyProduct) return;
    setSelectedProductsToCompare([null, null, null, null]);
  };

  return (
    <div className='compare-container'>
      <div className='compare-header'>
        <div className='compare-navigation'>
          <div>
            <img src={leftArrowIcon} alt='Left arrow icon' />
            <p>Back</p>
          </div>
          <div
            onClick={() =>
              setSelectedProductsToCompare([null, null, null, null])
            }
          >
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
            onClick={() => {
              setShowCompareBar(true);
              setCompareIndex(index);
            }}
            className='product-container'
          >
            {!prod ? (
              <div className='select-product-container'>
                <div className='select-product'>
                  <img src={plusIcon} alt='Plus icon' />
                  <span>Select product</span>
                </div>
                <img src={searchIcon} alt='Search icon' />
              </div>
            ) : (
              <div className=' flex gap-5'>
                <h1>name:{prod.name}</h1> <h2>brand:{prod.brand}</h2>{" "}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
