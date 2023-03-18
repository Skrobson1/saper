import React from "react";

const LobbyBox = (props)=> {
    
    return(
        <>
        <div className="border-solid border-white border-2 rounded mt-6" >
            <div className="grid grid-cols-2 gap-36 w-5/6 h-24 align-middle justify-center whitespace-nowrap" >
                <p>Lobby id: {props.id}</p>
                <p>Type: {props.type}x{props.type}</p>
            </div>
            <div className="border-solid h-auto w-auto border-t-2 rounded border-white" >
                {props.btn}
            </div>
        </div>
        
        </>
    );
}

export default LobbyBox;