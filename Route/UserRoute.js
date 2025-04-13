import express from "express"
const router  = express.Router();
import {register,login,UserDetails,UpdateAddress,UsersD}  from "../Controller/UserController.js"
import userAuth from "./userAuth.js";
import {addproduct, updateproduct,deleteproduct,getAllProducts, getRecentllyAdded,findByIdProducts,} from "../Controller/productsControllers.js";
import { addtoFavourite,removeFromFavourite,getfavourites} from "../Controller/favourites.js";
import { addToCart,getcartitems,removeItemFromCart} from "../Controller/cart.js";
import { PlaceOrder,getAllOrders,getOrderHistory, updateStatus,DeleteAllOrder, DeleteAllUserOrder} from "../Controller/OrderController.js";
import { getAllslots,DeleteSlot,CreateAllslots, getAllslotsUser, UpdateStatusSlot } from "../Controller/SlotController.js";

router.post("/register", register);//
router.post("/login", login);//
router.get("/userdetail",userAuth,UserDetails);//
router.put("/update-address",userAuth,UpdateAddress)//
router.post("/add-product",userAuth, addproduct);//
router.put("/update-product/:id",userAuth, updateproduct);
router.delete("/delete-product",userAuth, deleteproduct);//
router.get("/get-all-products",getAllProducts);//
router.get("/recentlly-added", getRecentllyAdded);//
router.get("/find-by-id/:id", findByIdProducts);// 
router.put("/add-to-favourites", userAuth,addtoFavourite);//
router.put("/remove-from-favourites", userAuth,removeFromFavourite);//
router.get("/get-all-favourites", userAuth, getfavourites);//

router.get("/cart-items", userAuth,getcartitems);//
router.put("/add-to-cart", userAuth, addToCart);//
router.put("/remove-from-cart", userAuth, removeItemFromCart); //
router.post("/place-order", userAuth, PlaceOrder);//
router.get("/get-order-history", userAuth, getOrderHistory);//-------------------
router.put("/update-status", userAuth, updateStatus);
router.get("/all-orders", userAuth, getAllOrders);//-----------------------------
router.delete("/delete-all-order", userAuth, DeleteAllOrder);
router.delete("/delete-user-order", userAuth, DeleteAllUserOrder);
router.delete("/user/:id", userAuth,UsersD)






router.get("/get-slot",getAllslots);
router.get("/get-users-slot", getAllslotsUser);
router.post("/add-slot",CreateAllslots);
router.delete("/delete-slot",DeleteSlot);
router.put("/update-slot",UpdateStatusSlot);
















export default  router
