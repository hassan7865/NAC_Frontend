import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Overview from "../Components/Overview";
import { Req } from "../src/Url";
export default function Home() {
    useEffect(()=>{
         const track = async () => {
              await Req.post("/track-visit")
            }
            track();
    },[])
    return (
       <div >
        <Overview/>
       </div>
    )
};