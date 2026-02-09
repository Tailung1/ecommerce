import { useMyContext } from "../MyContext";
import SearchBar from "./searching/SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();
  return (
    <div className=' px-6 w-[100%] bg-green-500 '>
      {!showSearchBar ? (
        <div className='h-full'>
          {" "}
          <p className='w-full'>1</p>
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>lastOne</p>
        </div>
      ) : (
        <SearchBar />
      )}
    </div>
  );
}
