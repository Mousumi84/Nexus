import { Outlet } from "react-router-dom";

export function FrontPage() {

    return (
    <>
        <div id="frontPage">
            <span className="monoton-regular"><q>Connect, share, and inspire! Bridge distances, reunite with friends & family, and build a global social family—one post at a time.</q>  <div>#StayConnected</div></span>
            <div id="vd-ls">
                <video autoPlay muted loop>
                    <source src="/nexus.mp4" type="video/mp4" />
                </video>
    
                <div id="outlet2">
                    <Outlet />
                </div> 
            </div>
        </div>
    </>);
}