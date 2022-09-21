import { version } from "react";
import mapConfig from "./config.json";


const getUrl= function(apiName,version){
    let  baseUrl = mapConfig.apibaseUrl
    if (apiName=="requirements" && version=="v1"){
        return baseUrl+ mapConfig.apiUrl.v1.requirements;
    }else if(apiName=="needs" && version=="v1"){
        return baseUrl+mapConfig.apiUrl.v1.needs;
    }else if (apiName=="sendOtp" && version=="v1"){
        return baseUrl+mapConfig.apiUrl.v1.sendOtp;
    }else if (apiName=="otpLogin" && version=="v1"){
        return baseUrl+mapConfig.apiUrl.v1.otpLogin;
    }else if (apiName=="userNeeds" && version=="v1"){
        return baseUrl+mapConfig.apiUrl.v1.needs
    }
}

export {getUrl} ;