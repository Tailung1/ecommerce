import "./ShoppingCartPop.scss";
import "./Header.scss"
import { useMyContext } from "../../contexts/MyContext";
import emptyCart from "../../assets/cartImage.png";
import bin from "../../assets/bin.png";
import iphone from "../../assets/iphone.png";


export default function ShoppingCartPop() {
  const { shoppingCart } = useMyContext();

  return (
    <div className='cart-pop'>
      <div>
        <span>Cart</span>
        <span>{shoppingCart.length} Product</span>
      </div>
      {shoppingCart.length === 0 ? (
        <div className='strech'>
          {" "}
          <img className='emptyCart-Image' src={emptyCart} alt='Empty cart icon' />
        </div>
      ) : (
        <div className='items-container'>
          {shoppingCart.map((item) => (
            <div key={Math.random() * 982} className='item-container'>
              <div className='flex justify-center items-center'>
                <img src={iphone} alt={item.name} />
                <div className='flex flex-col'>
                  {item.name}
                  {item.price}
                </div>
              </div>

              <div className='flex flex-col gap-5 items-end'>
                <img className='bin' src={bin} alt='bin image' />
                <div className='math-container '>
                  <span>-</span>
                  <span>{item.quantity}</span>
                  <span>+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='total-price-container'>
        <span></span>
        <p>
          Total Price: <span>{3099} $</span>
        </p>
      </div>

      <div className='strech'>
        <button>OPEN CART</button>
      </div>
    </div>
  );
}
