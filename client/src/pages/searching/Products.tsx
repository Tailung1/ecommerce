import { useParams } from "react-router-dom";

export default function Products() {
  const { category, id } = useParams();
  const getId = id?.split("-").slice(-1).join("").replace(/\D/g, "");
  return (
    <div>
      <h1>{`Category: ${category}`}</h1>
      <h1>{`id: ${getId}`}</h1>
    </div>
  );
}
