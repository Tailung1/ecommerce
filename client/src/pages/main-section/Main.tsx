import data from "../../data.json";
import mobilePhone from "../../assets/iphone.png";
import tv from "../../assets/television.png";
import laptops from "../../assets/laptop.png";
import ProductFeatures from "./shared-products";

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

      <section className='products-shared-container'>
        <p>Breathles in zommer</p>
        <ProductFeatures data={data.breathles} img={mobilePhone} />
      </section>
      <section className='gift-container'>
        <h3>Discover Gifts Awaiting You</h3>
        <ProductFeatures data={data.gifts} img={tv} />
      </section>
      <section className='new-products-container'>
        <h3>New Models</h3>
        <ProductFeatures data={data["new-models"]} img={laptops} />
      </section>
    </div>
  );
}
