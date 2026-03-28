import { useState } from "react";
import { useMyContext } from "../MyContext";
import compareIcon from "../assets/compare.png";
import cartIcon from "../assets/shopping-cart.png";
import mobilePhone from "../assets/iphone.png";

export default function Main() {
  const {
    cart,
    setCart,
    setShowWarningBar,
    setIsChosen,
    // setWarningMessage,
    selectedProductsToCompare,
    setSelectedProductsToCompare,
  } = useMyContext();

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
    { id: 5, name: "xiaomi 21s" },
  ]);
  const [gifts, setGifts] = useState([
    { name: "iPhone 17 Pro | Pro Max" },
    { name: "Computers" },
    { name: "ONEPLUS 15R" },
    { name: "Samsung 21s" },
  ]);

  const handleOperation = (task: "cart" | "compare", item: any) => {
    if (task === "compare") {
      const isProduct = selectedProductsToCompare.find(
        (i) => i?.id === item.id
      );
      if (isProduct) {
        setShowWarningBar(true);
        setIsChosen(true);
        return;
      }
      // if there is still place in array for new prodcut
      if (selectedProductsToCompare.some((item) => item == null)) {
        setSelectedProductsToCompare((prev) => {
          const newArr = [...prev];
          const index = newArr.indexOf(null);
          newArr[index] = item;
          return newArr;
        });
        return;
      } else {
        // no more free space in array..
        setShowWarningBar(true);
      }
    }
    if (task === "cart") {
      const findItem = cart.find((i) => i.id === item.id);
      if (findItem) {
        setShowWarningBar(true);
        setIsChosen(true);
        return;
      }
      setCart((prev) => [...prev, item]);
    }
  };

  const handleProductCheckInCart = (id: Number) => {
    const inCart = cart.find((item) => item.id === id);
    return inCart;
  };

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
              <div className='features'>
                <div
                  onClick={() => handleOperation("compare", item)}
                  className='compare-box'
                >
                  <img src={compareIcon} alt='Compare icon' />
                </div>
                {handleProductCheckInCart(item.id) ? (
                  <div
                    onClick={() => handleOperation("cart", item)}
                    className='cart-container'
                  >
                    <span>In cart </span>
                  </div>
                ) : (
                  <div
                    onClick={() => handleOperation("cart", item)}
                    className='cart-container'
                  >
                    <img src={cartIcon} alt='Cart icon' />
                    <span>Add</span>
                  </div>
                )}
              </div>
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
