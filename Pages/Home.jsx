import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Overview from "../Components/Overview";
export default function Home() {
    useEffect(()=>{
         const track = async () => {
              await Req.get("/track-visit")
            }
            track();
    },[])
    return (
       <div >
        <Overview/>
       </div>
    )
};