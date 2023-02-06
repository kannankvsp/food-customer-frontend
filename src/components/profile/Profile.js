import React, { useState } from "react";
//---------------------css------------------------
import "./profile.css";
// --------------------imgaes--------------------
//--------------------icons----------------------
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@mui/material";
import ReactFileReader from "react-file-reader";
//--------------------MUI----------------------
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
// import fire from "../../files/firebase";
// import axios from "axios";

function Profile() {
  const user = useSelector(state => state.user.value);
  const [profileDetails, setprofileDetails] = useState({
    email: user.email,
    name: user.name,
    picture: user.picture
  });
  //------------------------profle image upload - file reader---------------------
  const [profileImage, setProfileImage] = useState(`${user.picture}`);
  const dispatch = useDispatch();
  const handelProfileImage = files => {
    setProfileImage(files.base64);
  };
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

  const handleChange = e => {
    setprofileDetails({ ...profileDetails, [e.target.name]: e.target.value });
  };
  let today = new Date().toISOString().slice(0, 10);

  const updateProfile = e => {
    e.preventDefault();
    // fire
    //   .storage()
    //   .ref("profileimages")
    //   .child(today.toString() + ".jpg")
    //   .put(profileDetails.profileurl)
    //   .then(() => {
    //     fire
    //       .storage()
    //       .ref("profileimages")
    //       .child(today.toString() + ".jpg")
    //       .getDownloadURL()
    //       .then(imageurl => {
    //         alert(imageurl);
    //         profileDetails.profileurl = imageurl;
    //         axios
    //           .put("http://localhost:3001/updateprofile", profileDetails)
    //           .then(res => {
    //             if (res.data.status == 400) {
    //               dispatch(
    //                 getCateringPartnerData({
    //                   cateringservicename: user.cateringservicename,
    //                   username: profileDetails.username,
    //                   email: profileDetails.email,
    //                   password: profileDetails.password,
    //                   profileurl: profileImage,
    //                   phonenumber: profileDetails.phonenumber,
    //                   pancard: profileDetails.pancard,
    //                   gstin: profileDetails.gstin,
    //                   bankaccountnumber: profileDetails.bankaccountnumber,
    //                   ifsce: profileDetails.ifsce,
    //                   cateringserviceaddress:
    //                     profileDetails.cateringserviceaddress,
    //                   accountstatus: user.accountstatus
    //                 })
    //               );
    //               alert("Profile updated successfully");
    //             }
    //           });
    //       });
    //   });
  };
  return (
    <div>
      <Navbar />
      <p className="ProfileName">
        Welcome {user.name}
      </p>
      <div className="profileImageContainer">
        <div className="profileImageWrapper">
          <div className="profileImage">
            <img src={profileImage} />
            <div className="profileImageEdit">
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                handleFiles={handelProfileImage}
              >
                <span className="editIconContainer">
                  Edit<FaRegEdit className="editIcon" />
                </span>
              </ReactFileReader>
            </div>
          </div>
          <form>
            <CssTextField
              id="standard-number"
              type="text"
              variant="standard"
              className="inputField"
              placeholder="Email"
              name="email"
              value={profileDetails.email}
              onChange={handleChange}
            />
            <CssTextField
              id="standard-number"
              type="text"
              variant="standard"
              className="inputField"
              placeholder="Name"
              name="name"
              value={profileDetails.name}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              className="ProfileupdateButton"
              onClick={updateProfile}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
