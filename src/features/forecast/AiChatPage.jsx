import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import styled from "styled-components";
import axios from "axios";

/* 전체 컨테이너 */
const ChatContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 650px;

  margin: 60px auto;
  background: white;

  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);

  display: flex;
  flex-direction: column;
`;

/* 헤더 */
const Header = styled.div`
  padding: 15px;
  background: #4a90e2;
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 15px 15px 0 0;
`;

/* 硫붿떆吏� �곸뿭 */
const ChatBody = styled.div`
  flex: 1;
  padding: 15px;

  overflow-y: auto;
  background: #f7f9fc;
`;

/* 留먰뭾�� */
const Message = styled.div`
  max-width: 75%;
  margin-bottom: 12px;
  padding: 10px 14px;

  border-radius: 15px;
  font-size: 14px;
  line-height: 1.4;

  background: ${(props) =>
    props.isUser ? "#4a90e2" : "#e4e7ec"};

  color: ${(props) => (props.isUser ? "white" : "#333")};

  align-self: ${(props) =>
    props.isUser ? "flex-end" : "flex-start"};
`;

/* 입력 영역 */
const InputArea = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
`;

/* �낅젰李� */
const Input = styled.input`
  flex: 1;
  padding: 10px;

  border: 1px solid #ddd;
  border-radius: 6px;

  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

/* 버튼 */
const Button = styled.button`
  margin-left: 8px;
  padding: 10px 15px;

  background: #4a90e2;
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;
`;



const AiChatPage = ({forecast}) => {

    const [input, setInput]     = useState('');
    const [message, setMessage] = useState('');

    const scrollRef = useRef(null);

    //자동스크롤 내리기
    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[message]);

    const sendMessage = async () => {
            await api.post("openai/chatbot", {
                message: input
            })
            .then( response => {
                console.log(response.data.reply);
                setMessage((prev) => [...prev, response.data.reply]);
            })
            .catch (err => {
                console.log(err);
            }) ;
            setInput('');
           
        }
    

    return (
        <ChatContainer>
            <Header>AI Message</Header>
            <ChatBody>
                {message && message.map((msg, idx) => {
                    return(
                    <Message key={idx}>
                        {msg}
                    </Message>
                    )
                })}
                <div ref={scrollRef} />
            </ChatBody>
            <InputArea>
                <Input
                    placeholder="메시지를 입력하세요..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={sendMessage}>생성하기</Button>
            </InputArea>

        </ChatContainer>
        
    );
}

export default AiChatPage ;