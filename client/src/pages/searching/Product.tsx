import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { params } = useParams();

export default function Product() {
  const { product, setProduct } = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const productResponse = await fetch(
        `http://localhost:3000/api/products/getProduct/${params}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const product = productResponse.json();
      setProduct(product);
    };
    getProduct();
  }, []);
  return (
    <div>
      <h1>{`Product name: ${product.name}`}</h1>
      <h1>{`Product price: ${product.price}`}</h1>
    </div>
  );
}
