import { useMyContext } from "../MyContext";
import SearchBar from "./searching/SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();
  return (
    <div className='flex flex-col px-6'>
      {!showSearchBar ? (
        <div className=' flex flex-col '>
          {" "}
          <p className='w-full'>1</p>
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
          <p className='w-full'>last</p>{" "}
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
