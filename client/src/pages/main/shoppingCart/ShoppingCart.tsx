import { useMyContext } from "../../../contexts/MyContext";
import cartImage from "../../../assets/cartImage.png";

interface CartItem {
  id: string | number;
  name: string;
  price: number;
}

export default function Cart() {
  const { shoppingCart } = useMyContext();

  const total = shoppingCart.reduce((sum: number, item: CartItem) => sum + item.price, 0);

  return (
    <div className='flex flex-col flex-grow items-center pt-[100px] px-4'>
      {shoppingCart.length === 0 ? (
        <div className='flex flex-col items-center gap-4 text-center'>
          <img className='w-[200px] h-[200px]' src={cartImage} alt='Empty shopping cart' />

          <h1 className='text-2xl font-semibold'>Your cart is empty</h1>

          <p className='text-gray-500'>Add some products to your cart to see them here.</p>
        </div>
      ) : (
        <div className='w-full max-w-2xl'>
          <h1 className='text-3xl font-bold mb-6'>Shopping Cart</h1>

          <div className='flex flex-col gap-4'>
            {shoppingCart.map((item: CartItem) => (
              <div
                key={item.id}
                className='flex items-center justify-between rounded-lg border p-4 shadow-sm'
              >
                <h2 className='font-medium'>{item.name}</h2>

                <span className='font-semibold'>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className='mt-6 flex items-center justify-between border-t pt-4'>
            <h2 className='text-xl font-bold'>Total</h2>

            <span className='text-xl font-bold'>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
