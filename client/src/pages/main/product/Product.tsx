import "./Product.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBarDispatch } from "../../../contexts/BarContext";

export default function Product() {
  const { slug } = useParams();
  const { setBar } = useBarDispatch();
  const productTitle = slug
    ?.split("-")
    .slice(0, -3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      const productResponse = await fetch(`http://localhost:3000/api/products/getProduct/${slug}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const product = await productResponse.json();
      setProduct(product);
    };
    getProduct();
  }, [slug]);

  return (
    <div className='flex flex-col flex-grow '>
      <h1>{productTitle}</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1> <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1> <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>
      <h1>hikjhwelkjhwlekdjwedlwed</h1>{" "}
      <div className='price-container flex items-center left-0  fixed w-full bottom-0 justify-between bg-orange-500 p-2'>
        <p className='text-white font-bold'>{product?.price} Gel</p>
        <button
          onClick={() => setBar("showAuthBar", true)}
          className='bg-white text-orange-600 font-bold py-1 px-6 rounded-md'
        >
          Buy
        </button>
      </div>
    </div>
  );
}
