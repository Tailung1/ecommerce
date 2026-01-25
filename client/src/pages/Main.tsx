import { useMyContext } from "../MyContext";
import SearchBar from "./SearchBar";

export default function Main() {
  const { showSearchBar } = useMyContext();
  return (
    <main className='main px-6 w-[100%] max-h-[100%]  flex-grow '>
      {!showSearchBar ? (
        <div className='h-full'>
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
          <p className='w-full'>lastOne</p>
        </div>
      ) : (
        <SearchBar />
      )}
    </main>
  );
}
