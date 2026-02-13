import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const { slug } = useParams();

  const productTitle = slug
    ?.split("-")
    .slice(0, -1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [product, setProduct] = useState<productType | null>(null);
  const [showAuthBar, setShowAuthBar] = useState<boolean>(false);

  useEffect(() => {
    const getProduct = async () => {
      const productResponse = await fetch(
        `http://localhost:3000/api/products/getProduct/${slug}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const product = await productResponse.json();
      setProduct(product);
    };
    getProduct();
  }, []);
  return (
    <div className='flex-col flex-grow relative  '>
      <h1>{productTitle}</h1>
      {showAuthBar && (
        <div className='authBar flex flex-col gap-2 absolute bottom-0 bg-violet-500 p-3 w-full z-10'>
          <div className='flex gap-2 '>
            <p className='bg-orange-500'>Auth with number</p>
            <p className='bg-orange-500'> Auth with gmail</p>
          </div>
          <input
            className='px-3  max-w-[100px]'
            placeholder='Enter phone number'
          />
          <button>Submit</button>
        </div>
      )}

      <div className='flex  items-center  absolute w-full bottom-0  justify-between bg-orange-500 px-2 py-2  '>
        <p className='text-white font-bold'>{product?.price} Gel</p>
        <button
          onClick={() => setShowAuthBar(true)}
          className='bg-white text-orange-600 font-bold py-1  px-6 rounded-md'
        >
          Buy
        </button>
      </div>
    </div>
  );
}
