import "./Products.scss";
import { useParams } from "react-router-dom";
import Sort from "../../../components/reusable/Sort/Sort";
import { useBarDispatch } from "../../../contexts/BarContext";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { slug } = useParams();
  // const costumSlug = id?.split("-").slice(-1).join("").replace(/\D/g, "");
  //   const costumSlug = slug?.split("-").slice(-1);
  const { t } = useTranslation();

  const { setBar } = useBarDispatch();
  return (
    <div className='products-container'>
      {/* {/* <h1>{`Category: ${category}`}</h1> */}
      {/* <h1>{`id: ${getId}`}</h1>  */}
      <h1>{slug}</h1>
      <div className='py-3 flex flex-col gap-3'>
        <hr />
        <div className='flex gap-2 items-center '>
          <Sort />
          <p onClick={() => setBar("showFilterBar", true)}>{t("filter")}</p>
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
