import { Outlet } from "react-router-dom";
import Header from "../client/src/pages/header-section/Header";
import Footer from "../client/src/pages/Footer";

export default function Layout() {
  return (
    <div className='flex flex-col flex-grow '>
      <Header />
      <main className='flex-grow  bg-yellow-200'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
