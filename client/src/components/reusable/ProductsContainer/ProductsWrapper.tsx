import "./ProductsWrapper.scss";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../../contexts/MyContext";
import compareIcon from "../../../assets/compare.png";
import cartIcon from "../../../assets/shopping-cart.png";
import { useBarDispatch } from "../../../contexts/BarContext";
import { useCompareCart, useCompareDispatch } from "../../../contexts/CompareContext";

export default function ProductsWrapper({ data, img }: { data: any; img: string }) {
  const { shoppingCart, setShoppingCart } = useMyContext();
  const { setAlert } = useBarDispatch();
  const { compareCart, activeCompareCategory } = useCompareCart();
  const { setCompareCart, setCompareCategory } = useCompareDispatch();
  const navigate = useNavigate();

const generateSlug = (name: string, category: string, id: number) => {
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
    if (activeCompareCategory && activeCompareCategory !== item.category) return "wrongCategory";
    if (compareCart.every(Boolean)) return "isFull";

    return "ok";
  };

  const handleAction = (task: "cart" | "compare", item: any) => {
    if (task === "compare") {
      const status = getCompareActionStatus(item);

      if (status !== "ok") {
        enableAlertShow({ [status]: true });
        return;
      }

      const newArr = [...compareCart];
      const index = newArr.findIndex((i) => i === null);

      newArr[index] = item;
      setCompareCart(newArr);

      if (!activeCompareCategory) {
        setCompareCategory(item.category);
      }
    }

    if (task === "cart") {
      if (shoppingCart.some((i) => i.id === item.id)) {
        enableAlertShow({ isChosen: true });
        return;
      }

      setShoppingCart((prev) => [...prev, item]);
    }
  };

  const handleProductCheckInCart = (item: any) => {
    return shoppingCart.some((i) => i.id === item.id && i.category === item.category);
  };

  return (
    <div className='products-shared-wrapper'>
      {data.map((item: any) => (
        <div key={item.id}>
          <img
            onClick={() => generateSlug(item.name, item.category, item.id)}
            className='item-image'
            src={img}
            alt={`${item.name} image`}
            decoding='async'
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
              <img src={compareIcon} alt='Compare icon' decoding='async' />
            </div>

            {handleProductCheckInCart(item) ? (
              <div onClick={() => handleAction("cart", item)} className='cart-container'>
                <span>In cart</span>
              </div>
            ) : (
              <div onClick={() => handleAction("cart", item)} className='cart-container'>
                <img src={cartIcon} alt='Cart icon' decoding='async' />
                <span>Add</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
