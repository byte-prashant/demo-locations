import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Requirements} from './displayRequirementComponent'
import { useState } from "react";
import { getNeeds } from '../apiRequest';
import  NeedTable from './displayNeedsTableComponent.tsx';
const  DisplaySeekerComponent =(props) => {
  const [distance,setdistance]= useState(0); 
  const [needs,setNeeds]=useState([]);
  const [newAllRequirements,setNewAllRequirements] = useState({});
  const setmarrkersLonlat = props.setmarrkersLonlat
  const allRequirements = props.requirements
 
  const userloca = props.userloca
  const handleChange = (event) => {

    var value = event.target.value;
    console.log(value,"valueeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (value==""){
      value = 0  
    }
    setdistance(parseFloat(value));
   
  };

  const handleSubmit = async (event)=>{
        console.log("submitting the response");
        let n = await getNeeds(userloca[0],userloca[1],distance);
        setNeeds(n);
        // needs.map(item);
        let new_needs = []
        var newAllRequirement = {}
        var existingNeeds = {}
        allRequirements.forEach(element=>{
            newAllRequirement[element.id]=element.name
        });
        
        n.forEach(element => {
            
            new_needs.push([[element.long,element.lat],newAllRequirement[element.req_type_id]])
        });
        new_needs.push([[props.userloca[1],props.userloca[0]],"yr loca"])
        console.log("new_needs",new_needs,newAllRequirement);
        setmarrkersLonlat([]);
        setmarrkersLonlat(new_needs);
        setNewAllRequirements(newAllRequirement);
    }
  
  
  return (
    <div>
    {/* // <Requirements requirements={props.requirements} setUserRequirement={setUserRequirement}></Requirements> */}
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '125ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Input id="distance" name="distance" label="distance" variant="filled" value={distance} onChange={handleChange} style={{width: "172px"}}/>
      <NeedTable needs={needs} newAllRequirements={newAllRequirements}> </NeedTable>
      <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={handleSubmit}>Get needy!</Button>
    </Stack>
    </Box>
    </div>
  );
}

export {DisplaySeekerComponent};