import { useMyContext } from "../MyContext";
import leftArrowIcon from "../assets/left.png";
import plusIcon from "../assets/plus.png";
import binIcon from "../assets/bin.png";
import searchIcon from "../assets/search-icon.png";

export default function Compare() {
  const { setShowCompareBar } = useMyContext();
  const costumArray = new Array(4).fill("");

  return (
    <div className='compare-container'>
      <div className='compare-header'>
        <div className='compare-navigation'>
          <div>
            <img src={leftArrowIcon} alt='Left arrow icon' />
            <p>Back</p>
          </div>
          <div>
            <img src={binIcon} alt='bin icon' />
            <p>Clear</p>
          </div>
        </div>
        <hr className='compare-hr' />
      </div>
      <section className='compare-products-parent'>
        {costumArray.map(() => (
          <div
            onClick={() => setShowCompareBar(true)}
            className='product-container'
          >
            <div className='select-product'>
              <img src={plusIcon} alt='Plus icon' />
              <span>Select product</span>
            </div>
            <img src={searchIcon} alt='Search icon' />
          </div>
        ))}
      </section>
    </div>
  );
}
