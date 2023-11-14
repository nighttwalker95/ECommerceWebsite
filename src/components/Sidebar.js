import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";

const Sidebar = (props) => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cartItems, clearCart, totalPrice, itemAmount } =
    useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-9`}
    >
      <div className=" flex items-center justify-between py-6 border-b">
        <div className=" uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className=" cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className=" flex flex-col gap-y-2 h-[380px] md:h-[390px] lg:h-[400px] xl:h-[400px] overflow-y-auto overflow-x-hidden border-b">
        {cartItems.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className=" uppercase font-semibold">
            <span className="mr-2">Total:</span>
            {`$ ${totalPrice}`}
          </div>
          <div
            onClick={() => clearCart()}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-4 justify-center items-center w-full font-medium text-primary"
        >
          View Cart
        </Link>
        <Link
          to={"/"}
          className="bg-primary flex p-4 justify-center items-center w-full font-medium text-white"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
