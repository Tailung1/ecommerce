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

  const productSections = [
    {
      title: "home.breathlessInZoomer",
      data: data.breathles,
      image: mobilePhone,
    },
    {
      title: "home.discoverGifts",
      data: data.gifts,
      image: laptops,
    },
    {
      title: "home.newModels",
      data: data["new-models"],
      image: tv,
    },
  ];

  return (
    <div className='main-content'>
      <section className='hightlights-wrapper'>
        {data.highlights.map((highlight) => (
          <div key={highlight.name}>
            <p>{highlight.name}</p>
          </div>
        ))}
      </section>

      {isDesktop && <CategoriesAndCarousel />}

      {productSections.map((section) => (
        <section className='products-shared-container' key={section.title}>
          <h3>{t(section.title)}</h3>

          <ProductsWrapper data={section.data} img={section.image} />
        </section>
      ))}
    </div>
  );
}
