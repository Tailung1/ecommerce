import { useState } from "react";
import { useMyContext } from "../MyContext";
import SearchBar from "./searching/SearchBar";
import compareIcon from "../assets/compare.png";
import cartIcon from "../assets/shopping-cart.png";
import mobilePhone from "../assets/iphone.png";

export default function Main() {
  const { showSearchBar, cart, setCart } = useMyContext();

  const [highlights, setHighlights] = useState([
    { name: "iPhone 17 Pro | Pro Max" },
    { name: "Computers" },
    { name: "ONEPLUS 15R" },
    { name: "Samsung 21s" },
  ]);
  const [breathles, setBreathles] = useState([
    { id: 1, name: "iPhone 17 Pro | Pro Max" },
    { id: 2, name: "Computers" },
    { id: 3, name: "ONEPLUS 15R" },
    { id: 4, name: "Samsung 21s" },
  ]);
  const [gifts, setGifts] = useState([
    { name: "iPhone 17 Pro | Pro Max" },
    { name: "Computers" },
    { name: "ONEPLUS 15R" },
    { name: "Samsung 21s" },
  ]);
  const handleAddToCart = (item: any) => {
    console.log(item.id);
    const findItem = cart.find((i) => i.id === item.id);
    if (findItem) return;
    setCart((prev) => [...prev, item]);
  };

  return (
    <div>
      {!showSearchBar ? (
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
                <div
                  onClick={() => handleAddToCart(item)}
                  key={item.id}
                >
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
                  <div className='features'>
                    <div className='compare-box'>
                      <img src={compareIcon} alt='Compare icon' />
                    </div>
                    <div className='cart-container'>
                      <img src={cartIcon} alt='Cart icon' />
                      <span>Add</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className='gift-container'>
            <h3>Discover Gifts Awaiting You</h3>
          </section>
        </div>
      ) : (
        <SearchBar />
      )}
    </div>
  );
}
