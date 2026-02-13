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
    <div className='flex flex-col flex-grow '>
      <h1>{productTitle}</h1>
      <h1>{`Product price: ${product?.price}`}</h1>
    </div>
  );
}
