import { useState } from "react" ;
import Greeting from "../../components/rendering/Greeting" ;
import LoginButton from "../../components/rendering/LoginButton";
import LogoutButton from "../../components/rendering/LogoutButton";

const UserPage = () => {
    const [isFlag, setIsFlag ] = useState(false) ;

    //UI template
    return (
        <div>
            <Greeting flag = {isFlag} />

            {
                isFlag  ? <LogoutButton isLogin={setIsFlag}/> 
                        : <LoginButton  isLogin={setIsFlag}/> 
            }
        </div>
    )
}

export default UserPage ;