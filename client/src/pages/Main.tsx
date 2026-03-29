import data from "../data.json";
import mobilePhone from "../assets/iphone.png";
import tv from "../assets/television.png"
import ProductFeatures from "./ProductFeatures";

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
        <ProductFeatures data={data.breathles} img={mobilePhone} />
      </section>
      <section className='gift-container'>
        <h3>Discover Gifts Awaiting You</h3>
        <ProductFeatures
          data={data.gifts}
          img={tv}
        />
      </section>
    </div>
  );
}
