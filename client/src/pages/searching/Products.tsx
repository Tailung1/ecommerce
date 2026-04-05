import { useParams } from "react-router-dom";
import Sort from "../reusable/Sort";

export default function Products() {
  const { slug } = useParams();
  // const costumSlug = id?.split("-").slice(-1).join("").replace(/\D/g, "");
  //   const costumSlug = slug?.split("-").slice(-1);

  return (
    <div className="pr-3">
      {/* {/* <h1>{`Category: ${category}`}</h1> */}
      {/* <h1>{`id: ${getId}`}</h1>  */}
      <h1>{slug}</h1>
      <div className="py-3 flex flex-col gap-3">
        <hr />
        <Sort />
        <hr />
      </div>
      <h1>productss</h1>
    </div>
  );
}
