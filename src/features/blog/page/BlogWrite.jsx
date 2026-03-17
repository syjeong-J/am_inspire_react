import styled from "styled-components";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/axios"

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const WelcomeMessage = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
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

const BlogWrite = () => {
    /*
    요구사항)
    - title, content hook을 이용해서 상태관리가 필요함
    - 이벤트 발생 시 axios 이용해서 데이터를 전달하고 json-server(db.json) 저장
    - 작성글의 식별값(id)는 시간객체를 활용함
    - 라우터를 이용해서 BlogIndex로 이동
    */
   
    const moveUrl = useNavigate();   
    
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    //token 정보 가져오기
    const email = localStorage.getItem("token")
    console.log(">>>> BlogIndex token email :", email );
    const at    = localStorage.getItem("access_token")
    console.log(">>>> BlogIndex token access :", at );
        
    const saveHandler = async (title,content) => {
        const id = Date.now() ;
        console.log(">>>> save btn click params :", title, content, id) ;

        //json server
        // await api.post('/blogs', {
        //     id,title,content
        // })
        // .then( (response) => {
        //     console.log(">>>> then :", response.data);
        //     moveUrl('/blog/index'); 
        // })
        // .catch( (err) => {
        //     console.log(">>>> catch : ", err);
        // })

        //spring version
        await api.post('/blogs/write', {
            email : email,
            title : title,
            content : content
        },{ 
            headers: {Authorization: at ? at:""}
        })
        .then( (response) => {
            console.log(">>>> then :", response.status);
            moveUrl('/blog/index'); 
        })
        .catch( (err) => {
            console.log(">>>> catch : ", err);
        })
    }

    return(
        <div>
            <Wrapper>
                <Container>
                    {email && <WelcomeMessage>{email}님 환영합니다!</WelcomeMessage>}
                    <TextInput  height={20}
                                value={title}
                                changeHandler={(e) => {
                                    setTitle(e.target.value);
                                }}
                                />

                    <TextInput  height={480}
                                value={content}
                                changeHandler={(e) => {
                                    setContent(e.target.value);
                                }}/>

                    <Button title="작성글 저장"
                            onClick={() => saveHandler(title, content)}/>
                    &nbsp;&nbsp;
                    <Button title="이전"
                            onClick={ () => {
                                moveUrl('/blog/index');
                            }}/>
                </Container>
            </Wrapper>
        </div>
    )
};

export default BlogWrite;