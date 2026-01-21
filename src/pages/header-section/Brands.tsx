import { useMyContext } from "../../MyContext";


export default function Brands() {
  const { sectionToDisplay } = useMyContext();
  switch (sectionToDisplay) {
    case "mobile-phones":
      return (
        <section className='brands-wrapper brand-mobile-phones'>
          <div>Samsung</div>
          <div>Apple</div>
          <div>Xiaomi</div>
        </section>
      );

    case "tablets":
      return (
        <section className='brands-wrapper brand-tablets'>
          <div>Samsung-ttt</div>
          <div>Apple-ttt</div>
          <div>Xiaom-ttti</div>
        </section>
      );

    default:
      return (
        <section className='brands-wrapper brand-mobile-phones'>
          <div>default1</div>
          <div>default2</div>
          <div>default3</div>
        </section>
      );
  }
}
