import { Outlet } from "react-router-dom";
import Header from "../client/src/pages/header-section/Header";
import Footer from "../client/src/pages/Footer";
import Main from "./src/pages/Main";

export default function Layout() {
  return (
    <div className='bg-black'>
      <Header />
      <main className='flex-grow bg-green-600'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
