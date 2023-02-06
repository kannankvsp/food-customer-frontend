import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
// ---------css---------
import "./dishes.css";
// ---------images---------
import login_bg from "../../images/login_bg.avif";
// ---------icons---------
import { BiFilter } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";
//---------redux------
import { useSelector } from "react-redux";
// ---------Material UI---------
import Rating from "@mui/material/Rating";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dish from "../dish/Dish";
import axios from "axios";

function Dishes() {
  //---------hooks for rating--------
  const [ratingValue, setRatingValue] = useState(0);
  //-----------redux--------------
  const cartStore = useSelector(state => state.cartStore);
  var perPlateCost = 0;
  cartStore.value.map(item => (perPlateCost += item.cost));
  const hotel = useSelector(state => state.hotel.value);
  const [dishes, setdishes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/gethoteldishes/", {
        params: {
          cateringservicename: hotel.cateringservicename,
          email: hotel.email
        }
      })
      .then(res => {
        setdishes(res.data);
      });
  }, []);

  //---------temporary data for dish details----------
  const dishData = [
    {
      id: 1,
      image: login_bg,
      dishName: "Fried rice",
      cost: 120
    },
    {
      id: 2,
      image: login_bg,
      dishName: "Briyani",
      cost: 180
    },
    {
      id: 3,
      image: login_bg,
      dishName: "Butter Naan",
      cost: 65
    }
  ];
  //------------hooks for control the add to cart slider-----------------
  return (
    <div className="dishes_root_cont">
      {/* -------------navigation------------ */}
      <div id="navbar_sticky">
        <Navbar />
      </div>

      <div className="Dishes_compo_cont">
        <div className="Dishes_main_compo_cont">
          {/* -------------gallery------------ */}

          <div className="res_image_main_cont">
            <div className="res_image_cont">
              <div className="res_image_cont_sub1">
                <img src={hotel.picture} />
              </div>

              <div className="res_image_cont_sub2">
                <div className="res_image_cont_sub2_one">
                  <img src={hotel.picture} />
                </div>
                <div className="res_image_cont_sub2_two">
                  <img src={hotel.picture} />
                </div>
              </div>

              <div className="res_image_cont_sub3">
                <a href="#">
                  <img src={hotel.picture} />
                  <p>View Gallery</p>
                </a>
              </div>
            </div>
          </div>

          {/* -------------hotel names------------ */}

          <div className="hotel_main_title">
            <div className="hotel_main_title1">
              <div className="hotel_title_cont">
                <p>
                  {hotel.cateringservicename}
                </p>
                <p>
                  {hotel.address}
                </p>
                <p>
                  {hotel.mobile}
                </p>
              </div>

              <div className="hotel_title_cont1">
                <p>Ratings</p>
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              </div>
            </div>
          </div>

          {/* -------------horizontal line------------ */}

          <div className="horizontal_line">
            <p />
          </div>

          {/* -------------filter the dishes------------ */}

          <div className="filter_main_cont">
            <div className="filter_cont">
              <Button variant="contained">
                Filter <BiFilter id="filter_icon" />{" "}
              </Button>
              <div className="filter_checkbox_cont">
                <FormControlLabel
                  id="check_box"
                  control={
                    <Checkbox
                      name="veg"
                      sx={{
                        [`&, &.${checkboxClasses.checked}`]: { color: "green" }
                      }}
                    />
                  }
                  label="Veg"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="non-veg"
                      sx={{
                        [`&, &.${checkboxClasses.checked}`]: { color: "green" }
                      }}
                    />
                  }
                  label="Non-veg"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="south Indian"
                      sx={{
                        [`&, &.${checkboxClasses.checked}`]: { color: "green" }
                      }}
                    />
                  }
                  label="south Indian"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="North Indian"
                      sx={{
                        [`&, &.${checkboxClasses.checked}`]: { color: "green" }
                      }}
                    />
                  }
                  label="North Indian"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Chinese"
                      sx={{
                        [`&, &.${checkboxClasses.checked}`]: { color: "green" }
                      }}
                    />
                  }
                  label="Chinese"
                />
              </div>
            </div>
          </div>

          {/* -------------Dish item of hotels------------ */}

          <div className="dish_main_item">
            <div className="dish_main_item1">
              {dishes.map((item, index) => {
                return (
                  <Dish
                    dishName={item.dishname}
                    cost={item.price}
                    image={item.url}
                    id={item._id}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/*---------Display Total Cost----------*/}

      <div className="total_cost_dis_main_cont">
        <div className="total_cost_dis_cont">
          <p>
            Total Cost : ₹ {perPlateCost} per plate
          </p>
          <Link to="/cart">
            <Button variant="contained">
              Next <IoMdArrowDropright />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dishes;
