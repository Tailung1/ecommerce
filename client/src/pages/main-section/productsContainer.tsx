import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../MyContext";
import compareIcon from "../../assets/compare.png";
import cartIcon from "../../assets/shopping-cart.png";

export default function ProductsContainer({
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

  const navigate = useNavigate();

  const generateSlug = async (
    name: string,
    category: string,
    id: number
  ) => {
    const destName = name.replace(/\s+/g, "-");
    const slug = `${category}/${destName}-${id}`.toLowerCase();
    navigate(`/${slug}`);
  };

  const enableAlertShow = (options: {
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
        enableAlertShow({ isChosen: true });
        return;
      }

      const emptyIndex = compareCart.findIndex((i) => i === null);

      if (emptyIndex == -1) {
        enableAlertShow({ isFull: true });
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
        enableAlertShow({ isChosen: true });
        return;
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
    <div className='products-shared-wrapper'>
      {data.map((item: any) => (
        <div key={item.id}>
          <img
            onClick={() =>
              generateSlug(item.name, item.category, item.id)
            }
            className='item-image'
            src={img}
            alt='Item icon'
          />
          <div className='item-info-container'>
            {item.gifts ? (
              <span className='gift'>GIFTS</span>
            ) : (
              item.new && <span className='new'>NEW</span>
            )}

            <span className='price'>2000$</span>
            <p className='installment'>
              Per month from <span>74 $</span>
            </p>

            <span className='item-name'>{item.name}</span>
          </div>
          <div className='product-actions-container'>
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
