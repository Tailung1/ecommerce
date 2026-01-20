
export default function Brands(brandtype:any) {
  switch (brandtype) {
    case "phones":
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
          <div>Samsung</div>
          <div>Apple</div>
          <div>Xiaomi</div>
        </section>
      );
  }
}
