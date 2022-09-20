import Alert from '@mui/material/Alert';


const MsgOtp = function (props) {
 
    const isActive = props.isOtpSent;
    if (isActive==1) {
      return <Alert  onClose={() => {}} severity="success" sx={{ width: '100%' }}>Otp sent!</Alert>;
    }else if(isActive==2){
    return <Alert severity="error"  sx={{ width: '100%' }}>Unable to send OTP!</Alert>;
    }else{
      return <></>
    }
  }


const  MsgLoggedIN = function (props) {
 
    const isActive = props.isLoggedIn;
    if (isActive==1) {
      return <Alert  severity="success" sx={{ width: '100%' }}>Loggedin successfull!</Alert>;
    }else if(isActive==2){
    return <Alert severity="error"  sx={{ width: '100%' }}>Unable to Login!</Alert>;
    }else{
      return <></>
    }
  }
export {MsgOtp,MsgLoggedIN};