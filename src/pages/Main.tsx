import { useMyContext } from "../MyContext";
import SearchBar from "./SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();
  return (
    <div className='px-6 h-[100vh] bg:rgb(255, 255, 255);'>
      {!showSearchBar ? (
        <div>
          {" "}
          <p className='w-full'>textt11111221e12e</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
          <p className='w-full'>textt</p>
        </div>
      ) : (
        <SearchBar />
      )}
    </div>
  );
}
