import { useMyContext } from "../../MyContext";
import compareIcon from "../../assets/compare.png";
import cartIcon from "../../assets/shopping-cart.png";

export default function ProductFeatures({
  data,
  img,
}: {
  data: any;
  img: string;
}) {
  const {
    cart,
    setCart,
    setShowAlert,
    setIsChosen,
    setIsFull,
    activeProductCategory,
    setActiveProductCategory,
    compareCart,
    setCompareCart,
  } = useMyContext();

  const showAlert = (options: {
    isFull?: boolean;
    isChosen?: boolean;
  }) => {
    setShowAlert(true);
    if (options.isFull) setIsFull(true);
    if (options.isChosen) setIsChosen(true);
    return;
  };

  const handleOperation = (task: "cart" | "compare", item: any) => {
    if (task === "compare") {
      if (
        activeProductCategory &&
        activeProductCategory !== item.category
      ) {
        setShowAlert(true);
        return;
      }

      // great solution for category check if no useState is used to track it !!!!!

      //   const isCategory = compareCart.find(
      //     (i) => i !== null
      //   )?.category;
      //   if (isCategory && isCategory !== item.category) {
      //     setShowAlert(true);
      //     return;
      //   }

      if (compareCart.some((i) => i?.id == item.id)) {
        showAlert({ isChosen: true });
      }

      const emptyIndex = compareCart.findIndex((i) => i === null);

      if (emptyIndex == -1) {
        showAlert({ isFull: true });
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
        showAlert({ isChosen: true });
      } else {
        setCart((prev) => [...prev, item]);
      }
    }
  };

  const handleProductCheckInCart = (item: any) => {
    const inCart = cart.find(
      (i) => i.id === item.id && i.category === item.category
    );
    return inCart;
  };

  return (
    <div className='breathles-wrapper'>
      {data.map((item: any) => (
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
            {handleProductCheckInCart(item) ? (
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
