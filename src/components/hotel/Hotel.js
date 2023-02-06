import React from "react";
import { Link } from "react-router-dom";
// css link
import "./hotel.css";
// images
// react-icons
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getHotelData } from "../../Redux/reducers/hotel";

//hotel data from db
// const hotels = [
//   {
//     name: "Nalla Hotel",
//     image: { login_bg },
//     types: "South Indian,North Indian, Chinese",
//     rating: 3.8
//   },
//   {
//     name: "Nalla Hotel",
//     image: { login_bg },
//     types: "South Indian,North Indian, Chinese",
//     rating: 3.8
//   },
//   {
//     name: "Nalla Hotel",
//     image: { login_bg },
//     types: "South Indian,North Indian, Chinese",
//     rating: 3.8
//   },
//   {
//     name: "Nalla Hotel",
//     image: { login_bg },
//     types: "South Indian,North Indian, Chinese",
//     rating: 3.8
//   },
//   {
//     name: "Nalla Hotel",
//     image: { login_bg },
//     types: "South Indian,North Indian, Chinese",
//     rating: 3.8
//   },
//   {
//     name: "Nalla Hotel",
//     image: { login_bg },
//     types: "South Indian,North Indian, Chinese",
//     rating: 3.8
//   },
//   {
//     name: "Nalla Hotel",
//     image: { login_bg },
//     types: "South Indian,North Indian, Chinese",
//     rating: 3.8
//   }
// ];

function Hotel() {
  const [cateringService, setcateringService] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:3001/getallhotels/").then(res => {
      setcateringService(res.data);
    });
  }, []);

  return (
    <div className="hotel_card_Cont_top">
      <div className="hotel_card_Cont_main_top">
        {cateringService.map(item => {
          return (
            <div className="hotel_card_cont">
              <Link
                to="/dishes"
                onClick={() => {
                  dispatch(
                    getHotelData({
                      cateringservicename: item.cateringservicename,
                      username: item.username,
                      email: item.email,
                      picture: item.profileurl,
                      mobile: item.phonenumber,
                      address: item.cateringserviceaddress
                    })
                  );
                }}
              >
                <div className="hotel_card_main_cont">
                  <img src={item.profileurl} alt="Hotels" />
                  <div className="bottom_text_data">
                    <div className="bottom_text_data1">
                      <p>
                        {item.cateringservicename}
                      </p>
                      {/* <p>{item.types}</p> */}
                    </div>
                    <div className="bottom_text_data2">
                      <p>
                        {3.8}
                        <AiFillStar className="rating_icon" />
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hotel;
