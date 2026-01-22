import { useMyContext } from "../MyContext";
import SearchBar from "./SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();
  return (
    <div>
      {!showSearchBar ? (
        <p className='w-full h-screen bg-red-500'>textt</p>
      ) : (
        <SearchBar />
      )}
    </div>
  );
}
