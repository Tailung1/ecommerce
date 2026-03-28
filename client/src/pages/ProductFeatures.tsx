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
    selectedProductsToCompare,
    setSelectedProductsToCompare,
    activeCompareCategory,
    setActiveCompareCategory,
  } = useMyContext();

  const handleOperation = (task: "cart" | "compare", item: any) => {
    if (task === "compare") {
      if (selectedProductsToCompare.every((item) => item === null)) {
        setActiveCompareCategory(item.category);
      }
      if (activeCompareCategory) {
        if (activeCompareCategory !== item.category) {
          setShowWarningBar(true);
          return;
        }
      }
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
        setIsFull(true);
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
