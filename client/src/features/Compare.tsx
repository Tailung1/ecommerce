import { useMyContext } from "../MyContext";
import leftArrowIcon from "../assets/left.png";
import plusIcon from "../assets/plus.png";
import binIcon from "../assets/bin.png";

export default function Compare() {
  const { setShowCompareBar } = useMyContext();

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
        <hr />
      </div>
      <section className='compare-products'>
        <div>Select1</div>
        <div>Select2</div>
        <div>Select3</div>
        <div>Select4</div>
      </section>
    </div>
  );
}
