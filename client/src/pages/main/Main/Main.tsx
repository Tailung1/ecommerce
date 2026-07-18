import useWindowWidth from "../../../hooks/useWindowWidth";
import "../../../css/main.scss"; // had to import there.. maybe temporarily
import "./Main.scss";
import data from "../../../data.json";
import CategoriesAndCarousel from "../CategoriesCarousel/CategoriesCarousel";
import mobilePhone from "../../../assets/iphone.png";
import tv from "../../../assets/television.png";
import laptops from "../../../assets/laptop.png";
import ProductsContainer from "../../../components/reusable/ProductsContainer/ProductsContainer";
import { useTranslation } from "react-i18next";

export default function Main() {
  const width = useWindowWidth();
  const { t } = useTranslation();
  return (
    <div className='main-content'>
      <section className='hightlights-wrapper'>
        {data.highlights.map((h, index) => (
          <div key={index}>
            <p>{h.name}</p>
          </div>
        ))}
      </section>
      {width > 1023 && <CategoriesAndCarousel />}

      <section className='products-shared-container'>
        <p>{t("breathles in zoomer")}</p>
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
