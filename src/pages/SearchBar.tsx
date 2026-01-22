// import { useMyContext } from "../MyContext";
import searchIcon from "../assets/search-icon.png";

export default function SearchBar() {
  //   const {  } = useMyContext();
  return (
    <div className='serach-input-container'>
      <div className='serach-input-wrapper'>
        <input placeholder='Search' type='text' />
        <img
          className='serach-icon'
          src={searchIcon}
          alt='search icon'
        />
      </div>
      <div className='popular-searches-container'>
        <p>Popular Searches</p>
        <section className='popular-searches-wrapper'>
          <p>iphone 17</p>
          <p>laptops</p>
          <p>Sansung x</p>
          <p>iphone 16</p>
        </section>
      </div>
    </div>
  );
}
