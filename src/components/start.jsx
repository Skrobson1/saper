import React from "react";
import { useState } from "react";
import Lobby from "./lobby";
import Select from "./select";

const Start = () => {
    const [ rmv, setToggle ] = useState(true);
    const [ show, showSelect ] = useState(false);
    const [ show2, showSelect2 ] = useState(false);
    return (
        <>
        {rmv && (<div className="justify-center align-middle grid grid-cols-2 gap-10">
            <button onClick={ ()=> {
                setToggle(!rmv);
                showSelect(!show);
            } } >
            create
            </button>
            
            <button onClick={ ()=> {
                setToggle(!rmv);
                showSelect2(!show2);
                
            } } >
            join
            </button>

        </div>)}
        {show && (
            <Select></Select>
        )}
        {show2 && (
            <Lobby></Lobby>
        )}
        </>
    );
}

export default Start;