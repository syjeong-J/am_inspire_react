import Button from '../ui/Button' ;

const LoginButton =(props) => {
    const loginHandler = (setIsFlag) => {

        console.log(">>>> loginHandler click");
        // console.log(">>>> type =" , typeof setIsFlag)
        setIsFlag(true);
    };

    return (
        <div>
            <Button title="로그인" 
                    onClick= {() => loginHandler(props.isLogin)} />
        </div>
    );
}

export default LoginButton ;