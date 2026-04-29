import "./ProductsContainer.scss";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../../contexts/MyContext";
import compareIcon from "../../../assets/compare.png";
import cartIcon from "../../../assets/shopping-cart.png";
import { useBarDispatch } from "../../../contexts/BarContext";

export default function ProductsContainer({ data, img }: { data: any; img: string }) {
  const {
    shoppingCart,
    setShoppingCart,
    activeProductCategory,
    setActiveProductCategory,
    compareCart,
    setCompareCart,
  } = useMyContext();
  const { setAlert } = useBarDispatch();
  const navigate = useNavigate();

  //   great solution for category check if no useState is used to track it !!!!!

  //   const isCategory = compareCart.find(
  //     (i) => i !== null
  //   )?.category;
  //   if (isCategory && isCategory !== item.category) {
  //     setShowAlert(true);
  //     return;
  //   }

  const generateSlug = async (name: string, category: string, id: number) => {
    const destName = name.replace(/\s+/g, "-");
    const slug = `${category}/${destName}-${id}`.toLowerCase();
    navigate(`/${slug}`);
  };

  const enableAlertShow = ({
    isFull = false,
    isChosen = false,
  }: {
    isFull?: boolean;
    isChosen?: boolean;
  }) => {
    setAlert("showAlert", true);
    setAlert("isChosen", isChosen);
    setAlert("isFull", isFull);
  };

  const getCompareActionStatus = (item: any) => {
    if (compareCart.some((i) => i && i.id === item.id)) return "isChosen";
    if (activeProductCategory && activeProductCategory !== item.category) return "wrongCategory";
    if (compareCart.every(Boolean)) return "isFull";

    return "ok";
  };

  const handleAction = (task: "cart" | "compare", item: any) => {
    if (task === "compare") {
      const status = getCompareActionStatus(item);
      console.log(status);
      if (status !== "ok") {
        enableAlertShow({ [status]: true });
        return;
      }

      const newArr = [...compareCart];
      const index = newArr.findIndex((i) => i === null);
      newArr[index] = item;
      setCompareCart(newArr);

      if (!activeProductCategory) setActiveProductCategory(item.category);
    }

    if (task == "cart") {
      if (shoppingCart.some((i) => i.id === item.id)) {
        enableAlertShow({ isChosen: true });
        return;
      } else {
        setShoppingCart((prev) => [...prev, item]);
      }
    }
  };

  const handleProductCheckInCart = (item: any) => {
    const inCart = shoppingCart.some((i) => i.id === item.id && i.category === item.category);
    return inCart;
  };

  return (
    <div className='products-shared-wrapper'>
      {data.map((item: any) => (
        <div key={item.id}>
          <img
            onClick={() => generateSlug(item.name, item.category, item.id)}
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
            <div onClick={() => handleAction("compare", item)} className='compare-box'>
              <img src={compareIcon} alt='Compare icon' />
            </div>
            {handleProductCheckInCart(item) ? (
              <div onClick={() => handleAction("cart", item)} className='cart-container'>
                <span>In cart </span>
              </div>
            ) : (
              <div onClick={() => handleAction("cart", item)} className='cart-container'>
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
