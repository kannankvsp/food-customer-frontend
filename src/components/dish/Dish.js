import React, { useState } from "react";
// ---------css---------
import "./dish.css";
// ---------MUI ---------
import { Button } from "@mui/material";
//--------redux----------
import { useDispatch } from "react-redux";
import { cartState } from "../../Redux/reducers/cart";
function Dish(props) {
  //--------State management---------
  const dispatch = useDispatch();
  // --------hooks for "add -> added button changes"-------------
  const [addButton, setAddButton] = useState({
    cssChanged: true,
    text: "ADD",
    addTocart: false,
    dishData: []
  });
  const addButtonClicked = () => {
    // console.log(props)
    setAddButton({
      cssChanged: false,
      text: "ADDED",
      addTocart: true
    });
    dispatch(cartState(props));
  };

  return (
    <div className="dish_item_cont">
      <div className="dish_item_cont1">
        <div className="dish_item_cont1_sub1">
          <img src={props.image} />
        </div>
        <div className="dish_item_cont1_sub2">
          <p>
            {props.dishName}
          </p>
          <p>
            ₹ {props.cost}
          </p>
        </div>
      </div>

      <div className="dish_item_cont2">
        <div
          className={
            addButton.cssChanged
              ? "dish_item_cont2_sub1"
              : "dish_item_cont2_sub1_clicked"
          }
          onClick={addButtonClicked}
        >
          <Button variant="contained">
            {addButton.text}
          </Button>
          <p>+</p>
        </div>
      </div>
    </div>
  );
}

export default Dish;
