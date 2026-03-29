import { useMyContext } from "../MyContext";
import compareIcon from "../assets/compare.png";
import cartIcon from "../assets/shopping-cart.png";

export default function ProductFeatures({ item }: { item: any }) {
  const {
    cart,
    setCart,
    setShowWarningBar,
    setIsChosen,
    setIsFull,
    compareCart,
    setCompareCart,
  } = useMyContext();

  const handleOperation = (task: "cart" | "compare", item: any) => {
    if (task === "compare") {
      if (compareCart.some((i) => i?.id == item.id)) {
        setShowWarningBar(true);
        setIsChosen(true);
        return;
      }

      const isCategory = compareCart.find(
        (i) => i !== null
      )?.category;
      if (isCategory && isCategory !== item.category) {
        setShowWarningBar(true);
        return;
      }

      const emptyIndex = compareCart.findIndex((i) => i === null);
      if (emptyIndex == -1) {
        setShowWarningBar(true);
        setIsFull(true);
        return;
      }
      setCompareCart((prev) => {
        const newArr = [...prev];
        newArr[emptyIndex] = item;
        return newArr;
      });
    }

    if (task == "cart") {
      if (cart.some((i) => i.id === item.id)) {
        setShowWarningBar(true);
        setIsChosen(true);
        return;
      } else {
        setCart((prev) => [...prev, item]);
      }
    }
  };

  const handleProductCheckInCart = (id: Number) => {
    const inCart = cart.find((item) => item.id === id);
    return inCart;
  };

  return (
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
  );
}
