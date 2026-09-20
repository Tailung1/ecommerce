import "./Product.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBarDispatch } from "../../../contexts/BarContext";

type ProductData = {
  price: number;
};

const getProductTitle = (slug?: string): string => {
  if (!slug) {
    return "";
  }

  return slug
    .split("-")
    .slice(0, -3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const { setBar } = useBarDispatch();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productTitle = getProductTitle(slug);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const getProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:3000/api/products/getProduct/${encodeURIComponent(slug)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: ProductData = await response.json();

        if (!controller.signal.aborted) {
          setProduct(data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (!controller.signal.aborted) {
          setProduct(null);
          setError("Failed to load product.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    getProduct();

    return () => {
      controller.abort();
    };
  }, [slug]);

  return (
    <div className='flex flex-col flex-grow'>
      <h1>{productTitle}</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {product && !isLoading && !error && (
        <div>
          <p>Product loaded</p>
        </div>
      )}

      <div className='price-container flex items-center left-0 fixed w-full bottom-0 justify-between bg-orange-500 p-2'>
        <p className='text-white font-bold'>{isLoading ? "..." : `${product?.price ?? 0} Gel`}</p>

        <button
          type='button'
          onClick={() => setBar("showAuthBar", true)}
          disabled={isLoading || !product}
          className='bg-white text-orange-600 font-bold py-1 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Buy
        </button>
      </div>
    </div>
  );
}
