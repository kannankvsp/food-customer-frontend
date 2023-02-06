import React from 'react'
import Navbar from '../navbar/Navbar'
import Hotel from '../hotel/Hotel'
//-----------css-----
import './home.css'
//----images------
import login_bg from '../../images/login_bg.avif'
//----icons------
import { MdLocationPin } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
//----material UI-----
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    'color': "grey",
    '&:hover fieldset': {
      border: "none",
    },
    '& fieldset': {
      borderColor: 'green',
      border: "none",
    }
  },
});
const top100Films = [
  { title: 'Chennai'},
  { title: 'Namakkal'},                   
  { title: 'Trichy'},
  { title: 'Madurai'},
  { title: 'karur'},
  { title: "Erode"}
];

function Home() {
  return (
    <div>
      <div className='home_cont'>
        <div className='home_main_cont'>

          {/* ------Navigation bar------ */}
          <Navbar />

          {/* ------search bar------ */}
          <div className='input_main_cont1'>
            <div className='input_main_cont'>
              <img src={login_bg} />
              <div className='input_cont'>
                <div>
                  <MdLocationPin className='location_icon' />
                  {/* location data apprer in line number 28 */}
                  <Stack spacing={2} id='stack'>
                    <Autocomplete
                      select
                      id="free-solo-2-demo"
                      disableClearable
                      options={top100Films.map((option) => option.title)}
                      renderInput={(params) => (
                        <CssTextField
                          sx={{ width: "100%", padding: 0 }}
                          {...params}
                          placeholder="Select Location"
                          InputProps={{
                            ...params.InputProps,
                          }}
                          id='location_text_feild'
                          className='searchIconContainer'
                        />
                      )}
                    />
                  </Stack>
                </div>
                <div>
                  <p className='border_search_cont'></p>
                </div>
                <div>
                  <BiSearch className='search_icon' />
                  <CssTextField
                    sx={{ width: "100%", padding: 0 }}
                    placeholder="Search for Restaurant"
                    id='location_text_feild'
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ------display Hotels Names------ */}
          <Hotel />
        </div>
      </div>
    </div>
  )
}

export default Home