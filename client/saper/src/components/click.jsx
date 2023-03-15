import React, { useState } from "react";

const Btn = (props) => {
    const [cnt, setCount] = useState(0);

    return (
        <div>
            <h1>{cnt}</h1>
            <button onClick={ () => setCount(cnt + 1) } ><span>{cnt}</span> </button>
            <button onClick={ () => setCount(0) } >Clear</button>
            <p>{props.name}</p>
            {props.children}
        </div>
    );
}

export default Btn;