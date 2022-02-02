import { useRef, useEffect }  from 'react';


import useGoogleMaps from "../useGoogleMaps";

export default function ({
    center={
        lat: 40.7120,
        lng: 74.0060,
    },
    zoom=5,
    type='roadmap',
    options={
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
    },
}) {                           

    const { loading: loadingAPI } = useGoogleMaps(drawMap);                         

    const container = useRef(null);
    const map = useRef(null);


    function drawMap(){
        map.current = new window.google.maps.Map(container.current, {
        center: new window.google.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
        mapTypeId: type,
        ...options,          
       });
    }

    function dropMarker({
        icon,
        iconSize: {
            w: width=40,
            h: height=40,
        } = {},
        title,
        zoom,
        pos,
        animation='DROP',
    }){
        const markerIcon = icon ? {
            scaledSize: new window.google.maps.Size(width, height),
            ...icon,
        } : null;
        const marker = new window.google.maps.Marker({
            map: map.current,   
            icon: markerIcon && markerIcon,         
            title: title,
            position: pos,
            animation: window.google.maps.Animation[animation]
        });

        map.current.setCenter(pos);
        if(zoom){
            map.current.setZoom(zoom);
        }

        return marker;
    }

    function changeMarker({
        markerRef,
        pos,
        zoom,
    }){
        const marker = markerRef;
        markerRef.setPosition( pos );
        map.current.setCenter( pos );
        if(zoom){
            map.current.setZoom(zoom);
        }
    }

    function removeMarker({
        markerRef,
    }){
        let marker = markerRef;
        marker.setMap(null);
        marker = null;
    }


    function addMapListener(event, listener){
        window.google.maps.event.addListener(map, event, listener);
    }

    function removeMapListener(event, listener){
        window.google.maps.event.addListener(map, event, listener);
    }

    return {
        loadingAPI,
        map,
        container,
        drawMap,
        dropMarker,
        changeMarker,
        removeMarker,
        addMapListener,
        removeMapListener,
    }
}

