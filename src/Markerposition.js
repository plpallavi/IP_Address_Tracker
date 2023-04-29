import {Marker, Popup, useMap} from "react-leaflet";
import React from "react";
import {useEffect, useMemo} from "react";
import icon from "./icon";



export default function Markerposition({address}){
    const position = useMemo(()=>{
        return [address.location.lat, address.location.lng]
    },[address.location.lat, address.location.lng])
const map = useMap()

useEffect(()=>{
    map.flyTo(position,13,{
    animate:true
    })
},[map, position])
    return(
        <Marker icon={icon} position={[address.location.lat, address.location.lng]}>
            <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
        </Marker>
    )
}