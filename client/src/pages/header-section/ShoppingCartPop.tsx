import { useMyContext } from "../../MyContext";

export default function ShoppingCartPop() {
  const { cart } = useMyContext();
  return <div className='cart-pop'>{cart.length}</div>;
}
