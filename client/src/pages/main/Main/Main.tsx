import "../main.scss"; // had to import there.. maybe temporarily
import "./Main.scss";
import data from "../../../data.json";
import PC from "../PC/PC";
import mobilePhone from "../../../assets/iphone.png";
import tv from "../../../assets/television.png";
import laptops from "../../../assets/laptop.png";
import ProductsContainer from "../../../components/reusable/ProductsContainer/ProductsContainer";

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
      <PC />

      <section className='products-shared-container'>
        <p>Breathles in zommer</p>
        <ProductsContainer data={data.breathles} img={mobilePhone} />
      </section>
      <section>
        <h3>Discover Gifts Awaiting You</h3>
        <ProductsContainer data={data.gifts} img={tv} />
      </section>
      <section>
        <h3>New Models</h3>
        <ProductsContainer data={data["new-models"]} img={laptops} />
      </section>
    </div>
  );
}
