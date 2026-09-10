import { useMyContext } from "../../../contexts/MyContext";
import cartImage from "../../../assets/cartImage.png";

export default function Cart() {
  const { shoppingCart } = useMyContext();

  return (
    <div className='flex flex-col flex-grow items-center pt-[100px]'>
      {shoppingCart.length === 0 ? (
        <img className='w-[200px] h-[200px]' src={cartImage} alt='Shopping cart icon' />
      ) : (
        <div>
          {shoppingCart.map((item: any) => (
            <div key={item.id} className='flex flex-col gap-3'>
              <h1>{item.name}</h1>
              <h2>{item.price}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
