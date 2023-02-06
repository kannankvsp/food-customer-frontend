import React from 'react'
//---------css---------------
import './login.css'
//--------images-------------- 
import login_bg from '../../images/login_bg.avif'
import google_auth from '../../images/google_auth.png'
//---------react form validate-----------
import { useForm } from 'react-hook-form';
//---------material UI-------
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import GoogleAuthen from './GoogleAuthen';
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {

    '&:hover fieldset': {
      borderColor: 'green',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});


function Login() {
  //-------react hook form-----------
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = () => { }
  return (
    <div className='login_main_main_cont'>
      <div className='login_cont'>

        {/*--------Home design image----------
        -------------------------------------*/}

        <div className='login_img_cont'>
          <img src={login_bg} />
        </div>


        {/*-------app name------- 
        -------------------------*/}

        <h1 className='txt1'>Food searcher Catering<br></br>serivice app</h1>


        {/*------horizontal line-------
        -------------------------------*/}

        <div className='login_main_txt1'>
          <div className='login_main_txt'>
            <div className='login_txt'>
              <p>Log in or sign up</p>
            </div>
          </div>
        </div>


        {/*---------phone number feild for SMS --------
        --------------------------------------------*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='otp_main_cont otp_feild_txt_color'>
            <div className='otp_cont'>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
                id='box-phno'
              >
                <CssTextField fullWidth type='number' label=" +91 Enter ph number" id="fullWidth" sx={{
                  color: "#008000",
                }}
                  {...register("mobilenumber", { required: true })}
                />
              </Box>
              <p className='getOTP'>Get OTP</p>
              <Box className="form_validation">
                {errors.mobilenumber?.type === "required" &&
                  "Please Enter phone number"}
              </Box>
              <input type='number' placeholder='Enter OTP' id='otpField'  {...register("otpnumber", { required: true })} />
              <Box className="form_validation">
                {errors.otpnumber?.type === "required" &&
                  "Please Enter OTP"}
              </Box>
            </div>
          </div>


          {/*----button for login--------*/}

          <div className='otp_main_cont'>
            <div className='otp_cont'>
            <Link id='link' to='/home'>
              <Stack spacing={2} direction="row" id="login_btn_continue">
               
                  <Button variant="contained" sx={{
                    width: 500,
                    maxWidth: '100%',
                    padding: "12px 0px"
                  }}
                    className='btn'
                    type="submit"
                  >Continue </Button>
              
              </Stack>
              </Link>
            </div>
          </div>
        </form>


        {/*------horizontal line-------*/}

        <div className='login_main_txt1'>
          <div className='login_main_txt'>
            <div className='login_txt'>
              <p>or</p>
            </div>
          </div>
        </div>


        {/*-------Google authendication image-----------*/}

      <GoogleAuthen/>
      </div>


      {/*-----Terms and services------- */}

      <div className='policy_Cont'>
        <div className='policy_main_Cont'>
          <p>By continuing, you agree to our</p>
          <p>Terms of Service Privacy Policy Content Policy</p>
        </div>
      </div>
    </div>

  )
}

export default Login