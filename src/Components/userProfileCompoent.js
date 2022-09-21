import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import NeedTable from './userRequirementTableComponent.tsx';
import { getUserNeeds } from '../apiRequest';
const ProfileData = (props) => {
  let requirements = props.requirements
  const [show, setShow] = React.useState(false);
  const [userNeeds,setUserNeeds] = React.useState([]);
  const [newAllRequirements,setNewAllRequirements] = React.useState({});
  const setmarrkersLonlat = props.setmarrkersLonlat
  const handleClick = async() => {
    let new_needs = []
    var res = await getUserNeeds()
    setUserNeeds(res);
    console.log("user needs----------------------")
    let requirements_dict = {}
    requirements.forEach(element=>{
        requirements_dict[element.id]=element.name
    });
    setNewAllRequirements(requirements_dict);
    res.forEach(element => {
            
          new_needs.push([[element.long,element.lat],requirements_dict[element.req_type_id]])
      });
    new_needs.push([[props.userloca[1],props.userloca[0]],"yr loca"])
    console.log()
    setmarrkersLonlat([]);
    setmarrkersLonlat(new_needs);
    setShow(!show);
  };

  return (
    <div>
     <Card sx={{ minWidth: 27 }}>
        <List>
            <CardContent >
            
                <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Needs" />
                        {show ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                    <Collapse in={show} timeout="auto" unmountOnExit>
                        
                           
                                <NeedTable newAllRequirements ={newAllRequirements} needs={userNeeds}> </NeedTable>
                           
                        
                    </Collapse>
   
            
            </CardContent>
        </List>
    </Card>
    </div>
  );
}

export  {ProfileData};