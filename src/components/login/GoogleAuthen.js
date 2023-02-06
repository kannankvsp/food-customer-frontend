import google_auth from "../../images/google_auth.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Redux/reducers/user";
import { useNavigate } from "react-router-dom";

function GoogleAuthen() {
  // const user = useSelector((state)=>state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async respose => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`
            }
          }
        );
        dispatch(
          getUserData({
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture
          })
        );
        navigate("/home");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  });

  return (
    <div className="App">
      <div className="login_with_google_cont" onClick={login}>
        <img src={google_auth} />
      </div>
    </div>
  );
}

export default GoogleAuthen;
