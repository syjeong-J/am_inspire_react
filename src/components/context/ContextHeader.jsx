import { useContext } from "react";
import ctx from "./util/Context";

const ContextHeader = () => {

    const {isMode} = useContext(ctx) ;

    return(
        <div>
            <header style={{
                backgroundColor : isMode ? "black" : "white",
                color : isMode ? "white" : "black"
            }}>
                <h1>굿바이 2025년(feat.jslim)</h1>
            </header>
        </div>
    )
}

export default ContextHeader ;