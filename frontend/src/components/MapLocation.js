import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";
import mark from "../images/location.png"


export default function MapLocation() {
  const [viewport, setViewport] = useState({ });

  const getDetails = useSelector((state) => state.getDetails);
  const { user } = getDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
        
        setViewport({
                latitude: user.location.latitude,
                longitude: user.location.longitude,
                width: "95vw",
                height: "650px",
                zoom: 12

        })

  }, [ ])


  return (
    <div>
      <ReactMapGL
        {...viewport }
        mapboxApiAccessToken={"pk.eyJ1Ijoic3llZGFzaGFyMSIsImEiOiJja250MWRkMWcxMjU5MnBwZjBzazhtYjllIn0.k04cOm_P5xwbnQiSXE7puw"}
        mapStyle="mapbox://styles/syedashar1/cknt31gyl0s1v17o3z4riwmle"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >

            <Marker
            key={user._id}
            latitude={user.location.latitude}
            longitude={user.location.longitude}
          >
        {/* <img src = {} >

        </img> */}
        <Image src = {mark} ></Image>

          </Marker>
        

      </ReactMapGL>
    </div>
  );
}