import { useMyContext } from "../../MyContext";
import cartImage from "../../assets/cartImage.png";

export default function Cart() {
  const { cart } = useMyContext();

  return (
    <div className='flex flex-col flex-grow items-center pt-[100px] '>
      {cart.length === 0 ? (
        <img
          className='w-[200px] h-[200px]'
          src={cartImage}
          alt='shopping cart icon'
        />
        
      ) : (
        <div>
          {cart.map((item: productType) => (
            <div key={Math.random()*3212} className='flex flex-col gap-3'>
              <h1>{item.name}</h1>
              <h2>{item.price}</h2> <h1>PRODUCTSS</h1>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
}
