import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
//---------css-------
//---------images-----
import emptyCart from "../../images/cart.png";
import "./cart.css";
//--------icons-----
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { RiWhatsappFill, RiPhoneLine } from "react-icons/ri";
//---------redux------
import { useSelector, useDispatch } from "react-redux";
import { deleteState, totalPlateCostState } from "../../Redux/reducers/cart";
//---------MUI-------
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green"
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "green"
    },
    "&.Mui-focused fieldset": {
      borderColor: "green"
    }
  }
});

function Cart() {
  const [noOfPlates, setNoOfPlates] = useState(0);
  const [functionname, setfunctionname] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const cartStore = useSelector(state => state.cartStore);
  const hotel = useSelector(state => state.hotel.value);
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteItemHandler = (...id) => {
    let temp = [id, noOfPlates];
    dispatch(deleteState(temp));
  };

  var perPlateCost = 0;
  cartStore.value.map(item => (perPlateCost += item.cost));

  const handleCountChanged = e => {
    setNoOfPlates(e.target.value);
    dispatch(totalPlateCostState(e.target.value));
  };
  console.log(cartStore.value);
  const checkoutFunction = e => {
    e.preventDefault();
    var items = "";
    for (var i = 0; i < cartStore.value.length; i++) {
      items = items + cartStore.value[i].dishName + ",";
    }

    const data = {
      customername: user.name,
      customeremail: user.email,
      customerpicture: user.picture,
      functionname: functionname,
      date: date,
      timing: time,
      dishes: items,
      platepercost: perPlateCost,
      totalPlates: noOfPlates,
      totalAmount: noOfPlates * perPlateCost,
      paid: 0,
      pending: noOfPlates * perPlateCost,
      cateringname: hotel.cateringservicename,
      cateringemail: hotel.email,
      cateringAddress: hotel.address,
      cateringmbile: hotel.mobile
    };
    console.log(data);
    console.log(cartStore.value);
    axios.post("http://localhost:3001/bookcatering", data).then(res => {
      if (res.data.status == 400) {
        alert("Catering Booked Successfully");
        navigate("/home");
      }
    });
  };
  return (
    <div>
      <Navbar />
      {cartStore.value.length === 0
        ? <div className="emptyCart">
            <img src={emptyCart} />
            <p>Your cart is Empty</p>
            <Link to="/dishes" className="link">
              <Button variant="contained">Add some items</Button>
            </Link>
          </div>
        : <div>
            <div className="cart_container">
              <div className="cart_main_container">
                <div className="cart_main_container1">
                  <p>Your cart</p>
                </div>

                <div className="cart_main_container2">
                  <div className="cart_main_container2_sub1">
                    <table>
                      {cartStore.value.map((item, index) =>
                        <tr key={index}>
                          <td>
                            {item.dishName}
                          </td>
                          <td>
                            {item.cost}
                            <AiTwotoneDelete
                              className="deleteIcon"
                              onClick={() => deleteItemHandler(item.id)}
                            />
                          </td>
                        </tr>
                      )}
                      <tr id="addItemRow">
                        <td>
                          <Link className="link" to="/dishes">
                            add more items
                          </Link>
                        </td>
                        <td>
                          <Link className="link" to="/dishes">
                            <IoIosArrowForward className="arrowIcon" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Per plate cost</p>
                        </td>
                        <td>
                          <p>
                            ₹ {perPlateCost}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p>Enter no of persons</p>
                        </td>
                        <td>
                          <CssTextField
                            type="number"
                            id="standard-basic"
                            label="Counts"
                            variant="standard"
                            onChange={handleCountChanged}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p>Function name</p>
                        </td>
                        <td>
                          <CssTextField
                            type="text"
                            id="standard-basic"
                            label="Function name"
                            variant="standard"
                            value={functionname}
                            onChange={e => setfunctionname(e.target.value)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p>Pick Date</p>
                        </td>
                        <td>
                          <CssTextField
                            type="date"
                            id="standard-basic"
                            variant="standard"
                            value={date}
                            onChange={e => setdate(e.target.value)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p>Pick time</p>
                        </td>
                        <td>
                          <CssTextField
                            type="time"
                            id="standard-basic"
                            variant="standard"
                            value={time}
                            onChange={e => settime(e.target.value)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p>total amout to pay</p>
                        </td>
                        <td>
                          <p>
                            ₹ {cartStore.totalPlateCost || perPlateCost}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="quriesContainer">
                  <p>If you have any quires before going to payment.</p>
                  <p>
                    {" "}you can{" "}
                    <a href="tel:9360375911" className="cartCallSpan">
                      call
                    </a>
                    <RiPhoneLine className="cartPhoneIcon" /> or{" "}
                    <a
                      href="https://wa.me/6380608125?text=hai"
                      className="cartCallSpan"
                    >
                      whatsapp
                    </a>
                    <RiWhatsappFill className="cartWhatsappIcon" />
                  </p>
                </div>
                <div className="checkout_cont">
                  <Button variant="contained" onClick={checkoutFunction}>
                    Confirm
                  </Button>{" "}
                  &nbsp;
                  <Button variant="contained">Proceed to pay</Button>
                </div>

                <div>
                  <p />
                </div>
              </div>
            </div>
          </div>}
    </div>
  );
}

export default Cart;
