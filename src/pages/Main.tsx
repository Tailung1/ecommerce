import { useMyContext } from "../MyContext";
import SearchBar from "./SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();
  return (
    <div className="px-6">
      {!showSearchBar ? (
        <p className='w-full h-screen'>textt</p>
      ) : (
        <SearchBar />
      )}
    </div>
  );
}
