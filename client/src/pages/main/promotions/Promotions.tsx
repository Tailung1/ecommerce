import "./Promotions.scss";

const promotions = [
  {
    className: "p-breathless",
    label: "Featured",
    title: "Breathless in Zoomer",
    description: "Discover the Breathless Zoomer collection.",
    action: "Explore",
  },
  {
    className: "p-gifts",
    label: "Special",
    title: "Gifts",
    description: "Check out extraordinary Zoomer gifts.",
    action: "Shop Gifts",
  },
  {
    className: "p-new-models",
    label: "Latest",
    title: "New Models",
    description: "See the latest Zoomer models.",
    action: "View Models",
  },
];

export default function Promotions() {
  return (
    <section className='promotions' aria-labelledby='promotions-title'>
      <div className='promotions-header'>
        <div>
          <span className='section-label'>Discover</span>
          <h2 id='promotions-title'>Explore Zoomer</h2>
        </div>

        <p>Find something new from our latest collections.</p>
      </div>

      <div className='promotions-container'>
        {promotions.map((promotion) => (
          <article className={`promotion-card ${promotion.className}`} key={promotion.title}>
            <span className='promotion-label'>{promotion.label}</span>

            <div className='promotion-content'>
              <h3>{promotion.title}</h3>
              <p>{promotion.description}</p>
            </div>

            <button type='button' className='promotion-button'>
              {promotion.action}
              <span aria-hidden='true'>→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
