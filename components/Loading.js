import Image from "next/image";
// import Spinner from "react-spinkit";
function Loading() {
    return (
        <center
            style={{ display: "grid", placeItems: "center", height: "100vh" }}
        >
            <div>
                <Image
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                    alt="hehe"
                    height={200}
                    width={200}
                />
                {/* <Spinner
                    name="ball-spin-fade-loader"
                    color="#3CBC28"
                    fadeIn="none"
                /> */}
            </div>
        </center>
    );
}

export default Loading;
