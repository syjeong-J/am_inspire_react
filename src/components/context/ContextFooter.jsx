import { useContext } from "react";
import ctx from "./util/Context";

const ContextFooter = () => {
   
   const { isMode, setIsMode } = useContext(ctx);
   const modeHandler = () => {
    setIsMode(!isMode) ;
   }

    return (
        <div>
            <footer>
                <button type="button"
                        onClick={modeHandler}>모드변경</button>
            </footer>
        </div>
    );
    
}

export default ContextFooter ;