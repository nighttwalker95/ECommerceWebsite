import { Fragment } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Sidebar />
      <Footer />
    </Fragment>
  );
};

export default RootLayout;
