import "../../../css/main.scss";
import "./Home.scss";
import data from "../../../data.json";
import CategoriesAndCarousel from "../../../components/desktopHomeTopSection/DesktopHomeTopSection";
import mobilePhone from "../../../assets/iphone.png";
import tv from "../../../assets/television.png";
import laptops from "../../../assets/laptop.png";
import ProductsWrapper from "../../../components/reusable/ProductsContainer/ProductsWrapper";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../../hooks/useMediaQuery";

export default function Home() {
  const isDesktop = useMediaQuery();
  const { t } = useTranslation();

  return (
    <div className='main-content'>
      <section className='hightlights-wrapper'>
        {data.highlights.map((i, index) => (
          <div key={index}>
            <p>{i.name}</p>
          </div>
        ))}
      </section>

      {isDesktop && <CategoriesAndCarousel />}

      <section className='products-shared-container'>
        <p>{t("breathles in zoomer")}</p>
        <ProductsWrapper data={data.breathles} img={mobilePhone} />
      </section>

      <section>
        <h3>Discover Gifts Awaiting You</h3>
        <ProductsWrapper data={data.gifts} img={laptops} />
      </section>

      <section>
        <h3>New Models</h3>
        <ProductsWrapper data={data["new-models"]} img={tv} />
      </section>
    </div>
  );
}
