import { useMyContext } from "../../MyContext";
import mainLogo from "../../assets/main-logo.png"

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
    { name: "Apple iPad", image: "/images/apple-tablet.png" },
    {
      name: "Samsung Galaxy Tab",
      image: "/images/samsung-tablet.png",
    },
    { name: "Huawei MatePad", image: "/images/huawei-tablet.png" },
    { name: "Lenovo Tab", image: "/images/lenovo-tablet.png" },
  ],

  laptops: [
    { name: "Apple MacBook", image: "/images/apple-macbook.png" },
    { name: "Dell XPS", image: "/images/dell-xps.png" },
    { name: "HP Spectre", image: "/images/hp-spectre.png" },
    { name: "Lenovo ThinkPad", image: "/images/lenovo-thinkpad.png" },
  ],

  consoles: [
    { name: "PlayStation 5", image: "/images/playstation-5.png" },
    { name: "Xbox Series X", image: "/images/xbox-series-x.png" },
    { name: "Nintendo Switch", image: "/images/nintendo-switch.png" },
    { name: "PlayStation 4", image: "/images/playstation-4.png" },
  ],

  televisions: [
    { name: "Samsung QLED", image: "/images/samsung-qled.png" },
    { name: "LG OLED", image: "/images/lg-oled.png" },
    { name: "Sony Bravia", image: "/images/sony-bravia.png" },
    { name: "TCL Roku TV", image: "/images/tcl-roku.png" },
  ],

  "smart-home": [
    { name: "Google Nest", image: "/images/google-nest.png" },
    { name: "Amazon Alexa", image: "/images/amazon-alexa.png" },
    { name: "Philips Hue", image: "/images/philips-hue.png" },
    { name: "Ring", image: "/images/ring.png" },
  ],
};

export default function Brands() {
  const { activeSection } = useMyContext();
  const brandList =
    brandsData[activeSection as keyof BrandsData] || [];

  return (
    <section className='brands-wrapper'>
      {brandList.length > 0 ? (
        brandList.map((brand, index) => (
          <div key={index} className='brand-item'>
            <img
              src={mainLogo}
              alt={brand.name}
              className='brand-image'
            />
            <p className='brand-name'>{brand.name}</p>
          </div>
        ))
      ) : (
        <p>No brands available in this section.</p>
      )}
    </section>
  );
}
