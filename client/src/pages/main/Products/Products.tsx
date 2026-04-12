import { useMyContext } from "../../../MyContext";
import "./Products.scss";
import { useParams } from "react-router-dom";
import Sort from "../../../components/reusable/Sort/Sort";

export default function Products() {
  const { setShowFilterBar } = useMyContext();
  const { slug } = useParams();
  // const costumSlug = id?.split("-").slice(-1).join("").replace(/\D/g, "");
  //   const costumSlug = slug?.split("-").slice(-1);

  return (
    <div className='products-container'>
      {/* {/* <h1>{`Category: ${category}`}</h1> */}
      {/* <h1>{`id: ${getId}`}</h1>  */}
      <h1>{slug}</h1>
      <div className='py-3 flex flex-col gap-3'>
        <hr />
        <div className='flex gap-2 items-center '>
          <Sort />
          <p onClick={() => setShowFilterBar(true)}>Filter</p>
        </div>

        <hr />
      </div>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p> <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <p>products</p>
      <h1>productss productss</h1>
    </div>
  );
}
