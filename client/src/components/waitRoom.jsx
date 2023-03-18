import React, { useState } from "react";
import { useEffect } from "react";
import Saper from "./saper";

 const WaitRoom = (props) => {

    const [res, setRes] = useState([true, {}]);

    useEffect(()=>{
        console.log('render');
        props.socket.on("startGame", (data)=>{
            console.log("Moje id: "+data.id+" OponentId: "+ data.myId);
            setRes([false, data]);
        });

        return function cleanup() {props.socket.off('startGame')}
    }, []);

    return(
        <>
        {res[0] && (
            <div >
                <h3>Waiting...</h3>
            </div>
        )}
        {!res[0] && (
            <Saper d={res[1]} ></Saper>
        )}
        
        </>
    );
 }

 export default WaitRoom;