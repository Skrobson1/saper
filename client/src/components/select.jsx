import React, { useEffect, useState } from "react";
import WaitRoom from "./waitRoom";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function Select () {
    const addPlayer = (p)=>{
        socket.emit("addPlayer", { type: p});
    }

    const [ tgl, setToggle ] = useState(true);
    const [ r, setR ] = useState(false);

    useEffect(()=>{
        setR(true)
    }, [socket]);

    const boxStyle = "rounded-md box-border h-52 w-52 "+
    "border-2 m-auto flex justify-center items-center "+
    "cursor-pointer shadow-md shadow-cyan-500/50 hover:shadow "+
    "hover:shadow-inner hover:shadow-cyan-500/50";
    return (
        <>
        {tgl && r &&(
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <div className={boxStyle} >
                    <button className="font-medium w-full h-full" onClick={ () => {
                        addPlayer(8);
                        setToggle(!tgl);
                    }}>8x8</button>
                </div>
                <div className={boxStyle} >
                    <p className="font-medium">16x16</p>
                </div>
                <div className={boxStyle} >
                    <p className="font-medium">?</p>
                </div>
                <div className={boxStyle} >
                    <p className="font-medium">?</p>
                </div>
            </div>
        )}
        {!tgl && r &&(
            <WaitRoom socket={socket} ></WaitRoom>
        )}
        

        </>
    );
}

export default Select;