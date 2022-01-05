import Image from "next/image"
import {Circle} from "better-react-spinkit";
function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center"}}>
            <div>
                {/* <img src="" alt="" /> */}
                <Image src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="hehe" height={200} width={200}/>
                {/* <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="hehe" height={200} width={200}/> */}
                <Circle color="#3CBC28" size={60}/>
            </div>            
        </center>
    )
}

export default Loading
