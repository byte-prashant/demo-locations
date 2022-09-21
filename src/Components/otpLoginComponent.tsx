import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { sendOtp, otpLogin } from '../apiRequest';
import { useEffect } from "react";
import { MsgOtp,MsgLoggedIN } from './utils';

function PhoneCard(phone,handlePhoneChange, sendOtpReq) {
  return (
    <Card sx={{ minWidth: 27 }}>
      <CardContent>
        <CardActions>
          <TextField id="filled-basic" value={phone}
          onChange={handlePhoneChange} label="Phone no" variant="filled" />
        </CardActions>    
        <CardActions>
        <Button variant="outlined" onClick={sendOtpReq}>Send Otp</Button>
        </CardActions>
      </CardContent>
      <CardActions>
       
      </CardActions>
    </Card>
  );
}

function OtpCard(otp, handleOtpChange,handleSubmit,sendOtpReq) {
  return (
    <Card sx={{ minWidth: 27 }}>
      <CardContent>
        <CardActions>
          <TextField id="filled-basic" value={otp}  onChange={handleOtpChange} label="otp" variant="filled" />
        </CardActions>    
        <CardActions>
        <Button variant="outlined" onClick={handleSubmit} >Submit</Button>
        </CardActions>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={sendOtpReq}>Resend Otp</Button>
      </CardActions>
    </Card>
  );
}


const steps = [
  {
    label: 'Enter phone no',
    component:PhoneCard()
             
  },
  {
    label: 'Enter otp',
    component:OtpCard()
  },
  
];

function OtpLoginComponent(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [phone, setPhone] = React.useState("");
  const [otp,setOtp] = React.useState("");
  const [isOtpSent, setOtpSend] = React.useState(0);
  const setLoggedIn = props.setisLoggedIn
  const isLoggedIn = props.isLoggedIn
  const maxSteps = steps.length;

  const handlePhoneChange = (event: SelectChangeEvent) => {
    setPhone(event.target.value);
  };

  const handleOtpChange = (event: SelectChangeEvent) => {
    setOtp(event.target.value);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async(event)=>{
    console.log("submitting the response");
    var res = await otpLogin(phone,otp,"","")
    if (res.status==200){
      setLoggedIn(1)
      console.log(isLoggedIn);
      
    }else{
      setLoggedIn(2)
     
    }
}

const sendOtpReq = async(event)=>{
  console.log("submitting the response");
 var res = await  sendOtp(phone)
 if (res.status==200){
  setOtpSend(1)
  
  }else{
  setOtpSend(2)
 
  }
}


 
steps[0].component = PhoneCard(phone, handlePhoneChange,sendOtpReq)
steps[1].component = OtpCard(otp, handleOtpChange,handleSubmit,sendOtpReq)

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
          <Box sx={{ maxWidth: 300, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography>{steps[activeStep].label}</Typography>
          </Paper>
            <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
              {steps[activeStep].component}
            </Box>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
          <MsgOtp isOtpSent ={isOtpSent}></MsgOtp>
          <MsgLoggedIN isLoggedIn ={isLoggedIn}></MsgLoggedIN>
          </CardContent>
      <CardActions>
  
      </CardActions>
    </Card>
  );
}
export{OtpLoginComponent}