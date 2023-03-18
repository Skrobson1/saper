import React, { useEffect, useState } from "react";
import LobbyBox from "./lobbyBox";
import Saper from "./saper";
import io from 'socket.io-client';
// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://saperserv.vercel.app/");


const Lobby = () => {

    const SOCKET_URL = "https://saperserv.vercel.app/";
        socket.current = io(`${SOCKET_URL}`,{
            withCredentials: true,
            extraHeaders: {
                "secretHeader": "secret value"
        }
    });

    const [ rf, setRf ] = useState(false);
    const [canRender, setCanRender] = useState(<></>);
    const [ upd, setUpd ] = useState(true);
    const [ u, setU ] = useState(false);
    const [ res, setRes ] = useState("");
    const [ res2, setRes2 ] = useState([]);

    const onJoin = (u)=>{
        setU(true);
        socket.removeAllListeners();
        socket.emit("join", {id: u.id });
        console.log("JOINING: "+ u.id);
        socket.emit("initGame", {id: u.id} );
        
    }

    useEffect(()=>{
        socket.on("startGame", (data)=>{
            console.log("Moje id: "+data.id+" OponentId: "+ data.myId);
            setRes2(data);
            setUpd(false); 
        });
        
        return function cleanup() {socket.off('startGame')}
    }, [u])

    

    useEffect(()=>{
        if (upd) {
            socket.on("update", (data)=>{
                console.log("update");
                setRf(!rf);
            });
        }
            
        return function cleanup() {socket.off('update')}
    });


    const requestInfo = () => {
        socket.emit("requestInfo", "1", { name: "updated" }, (response) => {
            console.log(response);
            let s = "";
            response.forEach(element => {
                if(element.p.valid) {
                    s += element.p.id+":"+element.p.type+";";
                }
            });
            setRes(s);
        });
    }

    useEffect(()=>{
        requestInfo();  
    }, [rf]);
    
    
    return(
        <>
            <div id="cont" >
            {
                useEffect(()=>{
                    console.log(upd);
                    let items = [];
                    let temp = res;
                    for (let index = 0; index < (res.match(/;/g) || []).length; index++) {
                        items.push({id: temp.substring(0, temp.indexOf(":")), type: temp.substring(temp.indexOf(":")+1, temp.indexOf(";"))})
                        temp = temp.substring(temp.indexOf(";")+1, temp.length);
                    }
                    
                    let a = items.map((e, key) => {
                        console.log(items.indexOf(e));
                            return(
                                <LobbyBox key={key} id={e.id} type={e.type} btn={ <button id={items.indexOf(e)} className="h-full w-full justify-center align-middle" onClick={()=>{ onJoin({id: e.id, type: e.type}); }} >JOIN</button> } ind={items.indexOf(e)} ></LobbyBox>
                            );
                            
                    })
                    if (upd) {
                        setCanRender(a);
                    } else {
                        console.log("DSADAS");
                        setCanRender(<Saper d={res2} ></Saper>);
                    }               
                    
                }, [res, upd])
            }
            {canRender}
            </div>
        </>
    );
}

export default Lobby;