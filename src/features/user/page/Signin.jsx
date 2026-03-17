import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../../api/axios";

// Container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

// Form Box
const FormWrapper = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  width: 350px;
`;

// Title
const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: #333;
`;

// Input
const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0,123,255,0.3);
  }
`;

// Button
const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

// Link
const TextLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignIn = () => {
    
    const [form, setForm] = useState({
            email : '',
            password : ''
        }) ;
    
    const handelerChange = (e) => {
        const {name, value} = e.target ;
        setForm({...form , [name]: value })
    };

    const moveUrl = useNavigate();    

    const handlerSubmit = async (e) => {
        
        e.preventDefault();
        /*
        CRUD -> insert, read, update, delete
        axios
        - insert : post(새로운 자원을 생성)
        - read   : get(자원 조회)
        - update : put(전체리소스 수정), patch(일부리소스 수정)
        - delete : delete(자원 삭제)
        
        QueryString(url 뒤에 직접 데이터 바인딩)
        api.get(`/users?email=${}&password=${}`)

        실무권장방식
        api.get(`/users`,{
            params : {
                email : xxxxx,
                password : xxxxx
            }
        })
        */
       console.log(">>>> sigup submit call");
        try{
            
            // json server version
            // const response = await api.get(`/users` , {
            //     params : {
            //     email : form.email,
            //     password : form.password
            // }
            // });

            // spring version
            const response = await api.post(`/users/signIn`,{
              email : form.email,
              password : form.password
            });
            
            console.log(">>>> axios success : " );  
            console.log(response);   
            if( response.status === 200)  {

              // //인증된 사용자 정보 및 access token을 공유하기 위해서 데이터를 심어본다면?
              
              const email = response.data.email ; //response의 data에서 email 정도 가져오기
              console.log(">>>> token email : ", email);  
              localStorage.setItem("token", email); //이메일을 토큰으로 로컬스토리지에 심기
              // 인증유무 판단하기 위해서 
              const at = response.headers.get("authorization");
              console.log(">>> at :" , at);
              localStorage.setItem("access_token", at);
              moveUrl("/blog/index"); 
            } 

        } catch (err) {
            console.log(">>>> axios err : " , err );    
        }
    }   

    return(
        <Container>
            <FormWrapper>
                <Title>로그인</Title>
                <form onSubmit={handlerSubmit}>
                    <Input
                        type="email"
                        name="email"
                        value= {form.email}
                        onChange={handelerChange}
                        placeholder="email" />
                    <Input
                        type="password"
                        name="password"
                        value= {form.password}
                        onChange={handelerChange}
                        placeholder="password" />
                        <Button type="submit">로그인</Button>
                </form>
                <TextLink>비밀번호를 잊으셨나요?</TextLink>
                <TextLink to="/">회원가입</TextLink>
            </FormWrapper>
        </Container>
    );
}

export default SignIn ;