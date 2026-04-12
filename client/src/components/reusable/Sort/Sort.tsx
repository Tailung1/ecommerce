import { useState } from "react";
import ArrowIocn from "../../../assets/left-arrow.png";
export default function Sort() {
  const [rotate, setRotate] = useState<boolean>(false);

  return (
    <div className='flex relative'>
      <div
        onClick={() => setRotate((prev) => !prev)}
        className='flex justify-between p-2 rounded-lg min-w-[200px] bg-red-400'
      >
        <span>Sort</span>
        <img
          className={`${
            rotate ? "rotate-[90deg]" : "rotate-[-90deg]"
          }  duration-200`}
          src={ArrowIocn}
          alt={ArrowIocn}
        />
      </div>
      {rotate && (
        <div className='bg-green-400 rounded-md flex flex-col gap-2 absolute top-[55px] min-w-[200px]  left-0'>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
      )}
    </div>
  );
}
