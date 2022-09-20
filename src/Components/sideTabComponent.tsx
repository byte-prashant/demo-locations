import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  {CreateRequirementForm} from './createReuirementFormComponent.tsx';
import {DisplaySeekerComponent} from './displaySeekerComponent';
import {OtpLoginComponent} from './otpLoginComponent.tsx'
import AppBar from '@mui/material/AppBar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const  VerticalTabs = (props) =>{
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box
    sx={{ width: '100%' }}
    >
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
       <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Seek Help" {...a11yProps(0)} />
            <Tab label="Assist" {...a11yProps(1)} />\
            <Tab label="Profile" {...a11yProps(2)} />
            
          </Tabs>
          </AppBar>
      </Box>
               <TabPanel value={value} index={0}>
          <CreateRequirementForm requirements={props.requirements}  setuserData={props.setuserData} userloca= {props.userloca}></CreateRequirementForm>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DisplaySeekerComponent  requirements={props.requirements} userloca= {props.userloca} setmarrkersLonlat={props.setmarrkersLonlat}></DisplaySeekerComponent>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OtpLoginComponent></OtpLoginComponent>
          </TabPanel>
      
          
    </Box>
  );
}

export  {VerticalTabs};