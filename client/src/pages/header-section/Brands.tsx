import { useMyContext } from "../../MyContext";
import phoneImage from "../../assets/iphone.png";

type BrandsData = {
  "mobile-phones": { name: string; image: string }[];
  tablets: { name: string; image: string }[];
  laptops: { name: string; image: string }[];
  consoles: { name: string; image: string }[];
  televisions: { name: string; image: string }[];
  "smart-home": { name: string; image: string }[];
};

const brandsData: BrandsData = {
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

export default function Brands() {
  const { activeSection } = useMyContext();
  const brandList =
    brandsData[activeSection as keyof BrandsData] || [];

  return (
    <>
      {brandList.length > 0 ? (
        brandList.map((brand, index) => (
          <div key={index} className='brand-item'>
            <img
              src={phoneImage}
              alt={brand.name}
              className='brand-image'
            />
            <p className='brand-name'>{brand.name}</p>
          </div>
        ))
      ) : (
        <p>No brands available in this section.</p>
      )}
    </>
  );
}
