import Categories from "../header-section/Categories";

export default function PC() {
  return (
    <div className='pc-main-first-section'>
      <div className='categories-and-brands-parent'>
        <div className='pc-categories-and-brands-container'>
          <Categories />
          <div className='pc-brands-container'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
      <div className='sliderc'>Slider</div>
    </div>
  );
}
