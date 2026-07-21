import "./ProductsWrapper.scss";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../../contexts/MyContext";
// import compareIcon from "../../../assets/compare.png";
// import cartIcon from "../../../assets/shopping-cart.png";
import { useBarDispatch } from "../../../contexts/BarContext";
import { useCompareCart } from "../../../contexts/CompareContext";
import { useCompareDispatch } from "../../../contexts/CompareContext";
// import phone from "../../../assets/mobile-phone.png";

export default function ProductsWrapper({ data }: { data: any }) {
  const { shoppingCart, setShoppingCart } = useMyContext();
  const { setAlert } = useBarDispatch();
  const { compareCart, activeCompareCategory } = useCompareCart();
  const { setCompareCart, setCompareCategory } = useCompareDispatch();
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

      if (!activeCompareCategory) setCompareCategory(item.category);
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
    <div>
      
    </div>
  );
}
