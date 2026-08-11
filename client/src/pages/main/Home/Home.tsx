import "../../../css/main.scss"; // had to import there.. maybe temporarily
import "./Home.scss";
// import data from "../../../data.json";
import CategoriesAndCarousel from "../../../components/desktopHomeTopSection/DesktopHomeTopSection";
// import mobilePhone from "../../../assets/iphone.png";
// import tv from "../../../assets/television.png";
// import laptops from "../../../assets/laptop.png";
import ProductsContainer from "../../../components/reusable/ProductsContainer/ProductsWrapper";
import { useProducts } from "../../../hooks/useProducts";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../../hooks/useMediaQuery";

export default function Home() {
  const { data } = useProducts();
  const isDesktop = useMediaQuery();
  const { t } = useTranslation();

  return (
    <div className='main-content'>
      <section className='hightlights-wrapper'>
        {/* React Query always starts with data = undefined until the request finishes.Thats why i used ? with data */}
        {data?.map((i: any, index: number) => (
          <div key={index}>
            <p>{i.name}</p>
          </div>
        ))}
      </section>
      {isDesktop && <CategoriesAndCarousel />}

      <section className='products-shared-container'>
        <p>{t("breathles in zoomer")}</p>
        <ProductsContainer data={data} />
      </section>
      <section>
        <h3>Discover Gifts Awaiting You</h3>
        <ProductsContainer data={data} />
      </section>
      <section>
        <h3>New Models</h3>
        {/* <ProductsContainer data={data["new-models"]} img={laptops} /> */}
      </section>
      <section className='products-shared-container'>
        <p>{t("breathles in zoomer")}</p>
        <ProductsContainer data={data} />
      </section>
      <section>
        <h3>Discover Gifts Awaiting You</h3>
        <ProductsContainer data={data} />
      </section>
      <section>
        <h3>New Models</h3>
        {/* <ProductsContainer data={data["new-models"]} img={laptops} /> */}
      </section>
      <section className='products-shared-container'>
        <p>{t("breathles in zoomer")}</p>
        <ProductsContainer data={data} />
      </section>
      <section>
        <h3>Discover Gifts Awaiting You</h3>
        <ProductsContainer data={data} />
      </section>
      <section>
        <h3>New Models</h3>
        {/* <ProductsContainer data={data["new-models"]} img={laptops} /> */}
      </section>
    </div>
  );
}
