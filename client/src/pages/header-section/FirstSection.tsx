import usFlag from "../../assets/eng.png";
import teleCall from "../../assets/telephone-call.png";

export default function FirstSection() {
  return (
    <div className='pc-first-section'>
      <div className='text-white flex gap-1'>
        <img
          className='pt-1'
          src={teleCall}
          alt='telephone call icon'
        />
        <span>*7007</span>
      </div>
      <div className='info'>
        <span>Trade Politics</span>
        <span>Installment</span>
        <span>Carrer</span>
        <span>Trade In</span>
        <span>Branches</span>
        <div className='bg-white p-2 px-3  rounded-[15px]'>
          <img src={usFlag} alt='Usa flag icon' />
        </div>
      </div>
    </div>
  );
}
