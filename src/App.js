import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import { Style, Icon,Text ,Fill} from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { fromLonLat, get } from "ol/proj";
import {getRequirements} from "./apiRequest"
import mapConfig from "./config.json";
import "./App.css";
import Box from '@mui/material/Box';
import GeoLocation from "./Map/geoLocation";
import VectorSource from "ol/source/Vector";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { Collection } from "ol";
import {VerticalTabs} from "./Components/sideTabComponent.tsx";
import Grid from '@mui/material/Grid';
function addMarkers(lonLatArray) {

  
  let features = lonLatArray.map((item) => {
    console.log(item);
    var iconStyle = new Style({
      image: new Icon({
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: mapConfig.markerImage32,
      }),
      text: new Text({
        text:item[1],
        offsetY: 0,
        scale: 1.5,
        fill: new Fill({
            color: '#black',
        })
      })
    });

    let feature = new Feature({
      geometry: new Point(fromLonLat(item[0])),
      text:item[1]
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const App = () => {
  const [center, setCenter] = useState(fromLonLat(mapConfig.center));
  const [zoom, setZoom] = useState(10);
  const [showMarker, setShowMarker] = useState(false);
  const [lat, setLat] = React.useState("");
  const [requirements,setRequirements] = useState([]);
  const [long, setLong] = React.useState("");
  const [userData, setUserData] = useState({"name":"","phone_no":"","lat":lat,"long":long,"requirement":""});
  const [markersLonLat,setmarrkersLonlat] = useState([]);
  const [mapRef,setMapRef] = useState(null);
  let vectorLayer = new VectorLayer({
    source : new VectorSource()
  });
  vectorLayer.set('name', 'Markers');




  useEffect(async ()=>{
    setRequirements( await getRequirements());
    console.log(requirements);
  },[])
  useEffect(()=>{
    setTimeout(()=>{
    let map = new Map({
      view: new View({
        center: center,
        zoom : 1,
        
      }),

      target : 'map',
      layers : [new TileLayer({
        source: new OSM(),
      }),vectorLayer]
    });
    setMapRef(map)
    
  },100)
  },[])


  useEffect(()=>{
    if(!mapRef)
    return
   
    // mapRef.getView().setCenter(fromLonLat(center));
    // mapRef.getView().setZoom(zoom);
    mapRef.getView().animate({zoom:zoom,center:fromLonLat(center)})
    mapRef.getLayers().getArray()
            .filter(layer => layer.get('name') === 'Markers')
            .forEach(layer => mapRef.removeLayer(layer));
    
   

    vectorLayer.setSource(new VectorSource({
      features : addMarkers(markersLonLat)
    }))
    setUserData({...userData,"lat":lat,"long":long});
    if(showMarker)
    mapRef.addLayer(vectorLayer)
    console.log("updatind markers",markersLonLat)
    
  },[markersLonLat,showMarker,center,lat,long]);

  //if (!lat) return null
  return (
    <div>
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
              <Grid item xs={false} sm={4}  md={7}>
         
              <div id="map" style={{width:"100%",height:"100%"}}>   
             
              </div>
              
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'bottom',
                    alignItems: 'left',
                  }}
                >
                
              <GeoLocation setLat={setLat} setLong={setLong} setmarrkersLonlat={setmarrkersLonlat} setCenter={setCenter} />
              <VerticalTabs requirements={requirements} setuserData={setUserData} userloca={[lat,long]} setmarrkersLonlat={setmarrkersLonlat}></VerticalTabs>
                
              </Box>
              <br></br>
                <input
                  type="checkbox"
                  checked={showMarker}
                  onChange={(event) => setShowMarker(event.target.checked)}
                />{" "}
                Show markers
                
              </Grid>
        </Grid>
     
    </div>
  );
};

export default App;