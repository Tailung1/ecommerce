import { useMyContext } from "../../MyContext";
import compareIcon from "../../assets/compare.png";
import cartIcon from "../../assets/shopping-cart.png";

export default function ProductFeatures({
  data,
  img,
}: {
  data: {
    id: number;
    name: string;
    category: string;
    gifts?: boolean;
  }[];
  img: string;
}) {
  const {
    cart,
    setCart,
    setShowWarningBar,
    setIsChosen,
    setIsFull,
    activeProductCategory,
    setActiveProductCategory,
    compareCart,
    setCompareCart,
  } = useMyContext();

  const handleOperation = (task: "cart" | "compare", item: any) => {
    if (task === "compare") {
      if (
        activeProductCategory &&
        activeProductCategory !== item.category
      ) {
        setShowWarningBar(true);
        return;
      }

      // great solution for category check if no useState is used to track it !!!!!

      //   const isCategory = compareCart.find(
      //     (i) => i !== null
      //   )?.category;
      //   if (isCategory && isCategory !== item.category) {
      //     setShowWarningBar(true);
      //     return;
      //   }

      if (compareCart.some((i) => i?.id == item.id)) {
        setShowWarningBar(true);
        setIsChosen(true);
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
        if (emptyIndex === 0) {
          setActiveProductCategory(item.category);
        }
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
    <div className='breathles-wrapper'>
      {data.map((item) => (
        <div key={item.id}>
          <img className='item-image' src={img} alt='Item icon' />
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
  );
}
