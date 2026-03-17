import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "../../../components/ui/Button";
import TextInput from "../../../components/ui/TextInput";
import BlogCommentList from "../list/BlogCommentList";
import { useEffect, useState } from "react";
import api from "../../../api/axios";

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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
  margin: 100px auto;
`;

const WelcomeMessage = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
`;

const BlogRead = () => {
    // url에서 전달되는 파라미터를 전달 받을 수 있는 hook : useParams
    const {blogId} = useParams();
    console.log(">>>> blog load event params :", blogId);

    const [blog,setBlog] = useState({});
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');

    // token 정보 가져오기
    const email = localStorage.getItem("token")
    console.log(">>>> BlogIndex token email :", email );
    const at    = localStorage.getItem("access_token")
    console.log(">>>> BlogIndex token access :", at );

    const getBlog = async () => {
        
        /*
        api get()을 통해 데이터를 가져온 후 해당 데이터를 state 상태로 만드는 것
        - queryString : http://ip:port/blog?id=xxxx

            api.get(`/blogs?id=${id}`)
            api.get(`/blogs`, {
                params : {
                    id : id
                }
            })
        query statement : select * from table where id = ?
        - path variable 방식 : http://ip:port/blogs/xxxx
            api.get(`/blogs/${id}`)
        
        - embed 이용해서 특정블로그의 comments 함께 가져와 본다면?
            api.get(`/blogs/${id}?_embed=comments`) // id가 comments의 키값과 동일해야 함
        */
        // json server
        // await api.get(`/blogs/${id}?_embed=comments`)
        //     .then((response) => {
        //         console.log(">>>> BlogRead event getBlog response :", response);
        //         console.log(response.data);
                
        //         setBlog({
        //             id : response.data.id,
        //             title : response.data.title,
        //             content : response.data.content
        //         });
        //         setComments(response.data.comments || [] ); //댓글 없어도 ||함수 이용해서 [] 빈배열 넘겨서 undefined 오류 방지

        //     })
        //     .catch((err) => {
        //         console.log(">>>> BlogRead event getBlog catch : ", err);
        //     });

        // spring server
        await api.get(`/blogs/read/${blogId}`,{
            headers: {Authorization: at ? at:""} 
        })
            .then((response) => {
                console.log(">>>> BlogRead event getBlog response :", response);
                console.log(response.data);
                
                setBlog({
                    id : response.data.blogId,
                    title : response.data.title,
                    content : response.data.content
                });
                setComments(response.data.comments || [] ); //댓글 없어도 ||함수 이용해서 [] 빈배열 넘겨서 undefined 오류 방지

            })
            .catch((err) => {
                console.log(">>>> BlogRead event getBlog catch : ", err);
            });
    }

    useEffect(() => {
        getBlog();
    }, []);

    const moveUrl = useNavigate();

    //댓글입력 핸들러
    /*
    - 전달받은 인자를 axios를 이용해서 json server : comments 등록하고
    - 메인페이지로 이동이 아닌
    - 현재 화면에서 comments 갱신하여 바로 렌더링되도록 한다면?
    */
    const commentHandler = async (blogId, content) => {
        console.log(">>>> commentHandler click :", blogId, content);
        
        // json-server version
        // await api.post('/comments', {
        //     id      : Date.now() ,
        //     content : content,
        //     blogId  : blogId,
        //     token : email
        //     })
        //     .then((response) => {
        //         console.log(">>>> then :", response);
        //         /*전체가 렌더링 됨
        //         getBlog();
        //         setComment('');*/
        //         /* 부분 리렌더링을 위한 기본패턴(배열일 경우)
        //         if(response.status === 201) {
        //             const newComment = response.data[response.data.length - 1 ] ;
        //             setComments( (ary) => {
        //                 return[...ary , newComment] ; 
        //             })
        //             setComment('');
        //         }*/

        //         // 부분 리렌더링을 위한 기본패턴(객체)
        //         if(response.status === 201) {
        //             const newComment = response.data ;
        //             setComments( (ary) => {
        //                 return[...ary , newComment] ; 
        //             })
        //             setComment('');
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(">>>> catch : ", err);
        //     });

        await api.post('/blogs/comments/write', {   
            content : content,
            blogId  : blogId    
        },{ 
            headers: {Authorization: at ? at:""}
        })
        .then((response) => {
            console.log(">>>> then :", response);
        
            // 부분 리렌더링을 위한 기본패턴(배열)
            // if(response.status === 201) {
            //     const newComment = response.data ;
            //     // setComments( (ary) => {
            //     //     return[...ary , newComment] ; 
            //     // })
            //     setComments(response.data)
            //     setComment('');
            // }

            // 부분 리렌더링을 위한 기본패턴(객체)
            if(response.status === 201) {
                // const newComment = response.data ;
                // setComments( (ary) => {
                //     return[...ary , newComment] ;
                // })
                console.log("comments - " , response.data);
                setComments(response.data);
                setComment('');

            }
        })
        .catch((err) => {
            console.log(">>>> catch : ", err);
        });
    };

    // 댓글 삭제 핸들러 
    /*
    - 전달받은 식별값을 이용해서 해당 댓글을 삭제하고
    - axios - delete
    - 댓글UI 부분만 리렌더링한다면?
    */
    const commentDeleteHandler = async (commentId) => {
        console.log(">>>> commentDeleteHandler click : ", commentId);
        //comments배열을 반복문을 통해서 comment 안의 id와 (id)비교
        //같을 때 그 커멘트 안에 토큰값이 현재 로그인된 토큰 값(82번 줄 참고 localstorage)과 같을 때만 뒤에 로직 실행
        // var compareToken = '';
        // for(var i=0; i<comments.length; i++){ //i = index
        //     if(comments[i].id == id){
        //         compareToken = comments[i].token;
        //     }
        // }
        // console.log(compareToken);

        // if(token == email){
        //     await api.delete(`blogs/comments/${id}`, null, { 
        //     headers: {Authorization: at ? at:""}
        // })
        //     .then((response) => {
        //         console.log(">>>> then :", response);
        //          if(response.status === 200) {
        //             setComments(comments.filter((c) => c.id !== id));
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(">>>> catch : ", err);
        //     });
        // }else{
        //     window.alert("지울수없음");
        // }
    
        await api.delete(`/blogs/comments/delete/${commentId}`, { 
            headers: {Authorization: at ? at:""}
        })
        .then((response) => {
            console.log(">>>> then :", response);
            if(response.status === 204 ) {
                setComments(comments.filter((c) => c.commentId !== commentId));
            }
            })
        .catch((err) => {
            console.log(">>>> catch : ", err);
        });
        

    }

    return (
        <Wrapper>

            {/* 로딩될 때 스피너 화면 띄우고 로딩이 다 되면 화면 나오게 */}
            {!blog.id && <Spinner/>} 
            { blog.id &&

            <Container>

                {email && <WelcomeMessage>{email}님 환영합니다!</WelcomeMessage>}
                
                <Button title="메인페이지"
                        onClick={ () => {
                            moveUrl('/blog/index');
                        }}/>
                
                <PostContainer>
                    <TitleText>{blog.title}</TitleText>
                    <ContentText>{blog.content}</ContentText>
                </PostContainer>

                {/* 블로그 댓글 설계   */}
                <CommentLabel>작성된 댓글</CommentLabel>
                <BlogCommentList    comments={comments || [] }
                                    commentHandler={commentDeleteHandler}/>

                <TextInput  height={14}
                            value={comment}
                            changeHandler={(e) => {
                                setComment(e.target.value);
                            }}/>

                <Button title="댓글 작성"
                        onClick={ () => commentHandler(blog.id, comment)}/>

            </Container>
            }
        </Wrapper>
    );
}

export default BlogRead;