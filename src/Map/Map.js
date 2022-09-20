import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import Geolocation from 'ol/Geolocation';

const Map = ({ children, zoom, center}) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);


	  
	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);
		
		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;
		

		const geolocation = new Geolocation({
						// enableHighAccuracy must be set to true to have the heading value.
						trackingOptions: {
						enableHighAccuracy: true,
						},
						projection: map.getView().getProjection(),
		});
		if (!geolocation) return;
		const coordinates = geolocation.getPosition();
		geolocation.setTracking();
		geolocation.on('change:position', function () {
			coordinates = geolocation.getPosition();
			
		  });

		
		geolocation.on('change', function () {
			coordinates = geolocation.getPosition();
		  });
			
		console.log(coordinates);
		// setUserCoordinate(coordinates)
		map.getView().setCenter(center)
	}, [center])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;