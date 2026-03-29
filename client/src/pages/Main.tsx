import data from "../data.json";
import ProductFeatures from "./ProductFeatures";
import mobilePhone from "../assets/iphone.png";

export default function Main() {
  return (
    <div className='main-content'>
      <section className='hightlights-wrapper'>
        {data.highlights.map((h, index) => (
          <div key={index}>
            <p>{h.name}</p>
          </div>
        ))}
      </section>

      <section className='breathles-container'>
        <p>Breathles in zommer</p>
        <div className='breathles-wrapper'>
          {data.breathles.map((item) => (
            <div key={item.id}>
              <img
                className='item-image'
                src={mobilePhone}
                alt='Item icon'
              />
              <div className='item-info-container'>
                <span className='price'>2000$</span>
                <p>
                  Per month from{" "}
                  <span className='installment-price'>74 $</span>
                </p>

                <span className='item-name'>{item.name}</span>
              </div>
              <ProductFeatures item={item} />
            </div>
          ))}
        </div>
      </section>
      <section className='gift-container'>
        <h3>Discover Gifts Awaiting You</h3>
      </section>
    </div>
  );
}
