import styled from 'styled-components';
import Button from '../../../components/ui/Button'
import BlogList from '../list/BlogList';
import api from '../../../api/axios';
import { useState,useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const WelcomeMessage = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
`;

const LogoutButton = styled(Button)`
    background-color: #f44336;
    color: white;

    &:hover {
        background-color: #d32f2f;
    }
`;

const BlogIndex = () => {

    const moveUrl = useNavigate();

    const [ary , setAry] = useState([]);

    //token 정보 가져오기
    const email = localStorage.getItem("token")
    console.log(">>>> BlogIndex token email :", email );
    const at    = localStorage.getItem("access_token")
    console.log(">>>> BlogIndex token access :", at );
    
    const loadData = async () => {
        try {
            // 추후 jwt 토큰사용시 request header에 access token 심는 작업 필요
            const response = await api.get('/blogs/list', {
                headers: {Authorization: at ? at:""}
            })

            console.log(">>>> BlogIndex blog data :", response.data );
            setAry(response.data);

        } catch(err) {
            console.log(">>>> BlogIndex event loadData err :",err);
        }
    };

    const logoutHandler = async () => {
        console.log(">>> BlogIndex logout click : ");
        try {
        const response = await api.post(`/users/logout`,null,{
              headers: {Authorization: at ? at:""} 
            });
            // logout : 204
            localStorage.removeItem("token");
            localStorage.removeItem("access_token");
            moveUrl('/'); //랜딩으로 이동
        } catch(err) {
            console.log(">>>> BlogIndex logout err : ",err);
        }

       
    }

    useEffect(() => {
        loadData();
    },[]);

    return (
        <Wrapper>
            <Container>
                {email && <WelcomeMessage>{email}님 환영합니다!</WelcomeMessage>}
                <Button title="글 작성하기" 
                        onClick={() => {
                            moveUrl('/blog/write');
                        }}/>
                &nbsp;&nbsp;&nbsp;
                <Button title="로그아웃" 
                        onClick={logoutHandler}/>
                <BlogList blogs={ary} />

            </Container>
        </Wrapper>
    )

}

export default BlogIndex ;