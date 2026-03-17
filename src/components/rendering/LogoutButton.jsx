import Button from '../ui/Button';

const LogoutButton =(props) => {
    
    const logoutHandler = (setIsFlag) => {
        console.log(">>>> logoutHandler click");
        setIsFlag(false);
    };

    return (
        <div>
            <Button title="로그아웃" 
                    onClick= {() => logoutHandler(props.isLogin)} />
        </div>
    );
}

export default LogoutButton ;