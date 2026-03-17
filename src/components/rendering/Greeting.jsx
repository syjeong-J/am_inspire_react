import UserGreeting from './UserGreeting' ;
import GuestGreeting from './GuestGreeting' ;

const Greeting =({flag}) => {
    const isFlag = flag ;
    // if(isFlag) {
    //     return <UserGreeting />
    // } else {
    //     return <GuestGreeting />
    // }
    {
        return isFlag ? <UserGreeting /> : <GuestGreeting />
    }
}

export default Greeting ;