import { useMyContext } from "../MyContext";
import SearchBar from "./searching/SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();
  return (
    <div>
      {!showSearchBar ? (
        <div>
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
