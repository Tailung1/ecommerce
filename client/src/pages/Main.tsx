import { useState } from "react";
import ProductFeatures from "./ProductFeatures";
import mobilePhone from "../assets/iphone.png";

export default function Main() {
  const [highlights, setHighlights] = useState([
    { name: "iPhone 17 Pro | Pro Max" },
    { name: "Computers" },
    { name: "ONEPLUS 15R" },
    { name: "Samsung 21s" },
  ]);
  const [breathles, setBreathles] = useState([
    { id: 1, name: "iPhone 17 Pro | Pro Max", category: "phone" },
    { id: 2, name: "acer laptop", category: "laptop" },
    { id: 3, name: "samsung tv", category: "tv" },
    { id: 4, name: "Samsung 21s", category: "phone" },
    { id: 5, name: "xiaomi 21s", category: "phone" },
  ]);
  const [gifts, setGifts] = useState([
    { name: "iPhone 17 Pro | Pro Max" },
    { name: "Computers" },
    { name: "ONEPLUS 15R" },
    { name: "Samsung 21s" },
  ]);

  return (
    <div className='main-content'>
      <section className='hightlights-wrapper'>
        {highlights.map((h, index) => (
          <div key={index}>
            <p>{h.name}</p>
          </div>
        ))}
      </section>

      <section className='breathles-container'>
        <p>Breathles in zommer</p>
        <div className='breathles-wrapper'>
          {breathles.map((item) => (
            <div key={item.id}>
              <img
                className='item-image'
                src={mobilePhone}
                alt='Item icon'
              />
              <div className='item-info-container'>
                <span className='price'>2000$</span>
                <p>
                  Per month from{" "}
                  <span className='installment-price'>74 $</span>
                </p>

                <span className='item-name'>{item.name}</span>
              </div>
              <ProductFeatures item={item} />
            </div>
          ))}
        </div>
      </section>
      <section className='gift-container'>
        <h3>Discover Gifts Awaiting You</h3>
      </section>
    </div>
  );
}
