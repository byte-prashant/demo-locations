import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Requirements} from './displayRequirementComponent'
import { useState } from "react";
import { getHelp } from '../apiRequest';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function Msg(props) {
 

  const isRegistered = props.isRegistered;
  if (isRegistered==1) {
    return <Alert  severity="success" sx={{ width: '100%' }}>Request Registered!</Alert>;
  }else if(isRegistered==2){
  return <Alert severity="error"  sx={{ width: '100%' }}>Unable to register Request!</Alert>;
  }else{
    return <></>
  }
}
const  CreateRequirementForm =(props) => {
  const [userData,setLocalUserData]= useState({"name":"","phone_no":""});
  const [userRequirement, setUserRequirement] = useState();
  const [isReqCreated, setReqCreated] = useState(0);
  const userloca = props.userloca
  console.log(userloca,"userloca",userData);
  const setuserData = props.setuserData
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLocalUserData({ ...userData, [name]: value });
    setuserData({...userData});
  };

  const handleSubmit = async (event)=>{
        console.log("submitting the response");
        var response = await getHelp(userData.phone_no,userloca[0],userloca[1],userRequirement)
        if (response.status==200){
          setReqCreated(1)
          
        }else{
          setReqCreated(2)
         
        }
        console.log("iscreated", isReqCreated);
        
  }

 


  
  return (
    <div>
    <Requirements requirements={props.requirements} setUserRequirement={setUserRequirement}></Requirements>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="name"  name ="name" label="name" variant="outlined" value={userData.name} onChange={handleChange}/>
      <TextField id="phone_no" name="phone_no" label="phone" variant="filled" value={userData.phone_no} onChange={handleChange} />
      <Stack spacing={2} direction="row">
      
      <Msg isRegistered={isReqCreated}  ></Msg>
      
      <Button variant="outlined" onClick={handleSubmit}>Seek help!</Button>
    </Stack>
    </Box>
    </div>
  );
}

export {CreateRequirementForm};