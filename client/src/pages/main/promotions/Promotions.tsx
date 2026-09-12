import "./Promotions.scss";

export default function Promotions() {
  return (
    <div className='promotions-container'>
      <section className='promotion-card p-breathless'>
        <span className='promotion-label'>Featured</span>
        <h3>Breathless in Zoomer</h3>
        <p>Discover Breathless Zoomer</p>
        <button type='button'>Explore</button>
      </section>

      <section className='promotion-card p-gifts'>
        <span className='promotion-label'>Special</span>
        <h3>Gifts</h3>
        <p>Check out extraordinary Zoomer gifts</p>
        <button type='button'>Shop Gifts</button>
      </section>

      <section className='promotion-card p-new-models'>
        <span className='promotion-label'>Latest</span>
        <h3>New Models</h3>
        <p>See the latest models</p>
        <button type='button'>View Models</button>
      </section>
    </div>
  );
}
