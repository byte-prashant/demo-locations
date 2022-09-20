
import axios from "axios";
import { getUrl} from "./utils";
import React from "react";



const getRequirements = async () => {
    console.log(getUrl("requirements","v1"))
    return axios.get(getUrl("requirements","v1")).then((response) => {
      console.log("response.data", response.data);
      return response.data;
    });
  };

  

const sendOtp = async (phone) => {
                    
  if (phone) {
    //const phoneNumber = phone.slice(3);
    console.log("url-------------",getUrl("sendOtp","v1"));
    const data = {
      
      phone: phone,

    };
   return  axios
      .post(getUrl("sendOtp","v1"), data)
      .then(function (response) {
        console.log(getUrl("sendOtp","v1"));
        console.log("baseRequirementURL response", response);
        return response
      })
      .catch(function (error) {
        console.log("baseRequirementURL error", error);
        return error
      });
  }
};


  const otpLogin = async(phone, otp, email, name) => {
                    
    if (phone) {
      //const phoneNumber = phone.slice(3);
      const data = {
        phone: phone,
        otp:otp,
        email:email,
        name:name
      };
      return axios
        .post(getUrl("otpLogin","v1"), data)
        .then(function (response) {
          console.log("baseRequirementURL response", response);
          return response
        })
        .catch(function (error) {
          console.log("baseRequirementURL error", error);
          return error
        });
    }
  };
  

const getHelp = async(phone, lat, long, user_req_id) => {
                    
    if (phone) {
      //const phoneNumber = phone.slice(3);
      const data = {
        request_type: user_req_id,
        phone: phone,
        lat: `${lat}`,
        long: `${long}`,
      };
      return axios
        .post(getUrl("needs","v1"), data)
        .then(function (response) {
          console.log("baseRequirementURL response", response);
          return response
        })
        .catch(function (error) {
          console.log("baseRequirementURL error", error);
          return error
        });
    }
  };




const getNeeds = async(latitude, longitude, distances) => {
   
      let baseNeedURL = `${getUrl("needs","v1")}?lat=${latitude}&long=${longitude}&dist=${distances}`;
      console.log("first", baseNeedURL);

      return axios.get(baseNeedURL).then((response) => {
        console.log("needs.data", response.data);
        return response.data;
      });
    
  };

  export {getRequirements,getHelp,getNeeds, otpLogin, sendOtp};