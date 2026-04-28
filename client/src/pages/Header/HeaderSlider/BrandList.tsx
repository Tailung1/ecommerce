import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../../MyContext";
import phoneImage from "../../../assets/iphone.png";
import { useBarDispatch } from "../../../contexts/BarContext";

type brandsDataTypes = {
  "mobile-phones": { name: string; image: string }[];
  tablets: { name: string; image: string }[];
  laptops: { name: string; image: string }[];
  consoles: { name: string; image: string }[];
  televisions: { name: string; image: string }[];
  "smart-home": { name: string; image: string }[];
};

const brandsData: brandsDataTypes = {
  "mobile-phones": [
    { name: "Apple", image: "/images/apple-phone.png" },
    { name: "Samsung", image: "/images/samsung-phone.png" },
    { name: "Xiaomi", image: "/images/xiaomi-phone.png" },
    { name: "OnePlus", image: "/images/oneplus-phone.png" },
    { name: "Google Pixel", image: "/images/google-pixel-phone.png" },
    { name: "Huawei", image: "/images/huawei-phone.png" },
    { name: "Sony", image: "/images/sony-phone.png" },
  ],

  tablets: [
    { name: "Apple", image: "/images/apple-tablet.png" },
    { name: "Samsung", image: "/images/samsung-tablet.png" },
    { name: "Huawei", image: "/images/huawei-tablet.png" },
    { name: "Lenovo", image: "/images/lenovo-tablet.png" },
  ],

  laptops: [
    { name: "Apple", image: "/images/apple-laptop.png" },
    { name: "Dell", image: "/images/dell-laptop.png" },
    { name: "HP", image: "/images/hp-laptop.png" },
    { name: "Lenovo", image: "/images/lenovo-laptop.png" },
  ],

  consoles: [
    { name: "PlayStation", image: "/images/playstation-console.png" },
    { name: "Xbox", image: "/images/xbox-console.png" },
    { name: "Nintendo", image: "/images/nintendo-console.png" },
    { name: "Razer", image: "/images/razer-console.png" },
  ],

  televisions: [
    { name: "Samsung", image: "/images/samsung-tv.png" },
    { name: "LG", image: "/images/lg-tv.png" },
    { name: "Sony", image: "/images/sony-tv.png" },
    { name: "TCL", image: "/images/tcl-tv.png" },
  ],

  "smart-home": [
    { name: "Google", image: "/images/google-home.png" },
    { name: "Amazon", image: "/images/amazon-home.png" },
    { name: "Philips", image: "/images/philips-home.png" },
    { name: "Ring", image: "/images/ring-home.png" },
  ],
};

export default function BrandList() {
  const { activeCategory } = useMyContext();
  const brandList = brandsData[activeCategory as keyof brandsDataTypes] || [];
  const navigate = useNavigate();
  const {setBar} = useBarDispatch();

  const handleNavigate = (category: string, brand: string) => {
    const brandSlug = brand.toLowerCase().replace(/\s+/g, "-");
    const url = `${category}-${brandSlug}-c346`;
    navigate(url);
    setBar("showSideBar", false);
  };
  {
  }
  return (
    <section className='brands-section'>
      <div className='brands-wrapper'>
        {brandList.length > 0 ? (
          brandList.map((brand, index) => (
            <div
              onClick={() => handleNavigate(activeCategory, brand.name)}
              key={index}
              className='brand-item'
            >
              <img src={phoneImage} alt={brand.name} className='brand-image' loading='lazy' />
              <p className='brand-paragraph'>{brand.name}</p>
            </div>
          ))
        ) : (
          <p>No brands available in this section.</p>
        )}
      </div>
      {activeCategory === "mobile-phones" && <button>See all</button>}
    </section>
  );
}
