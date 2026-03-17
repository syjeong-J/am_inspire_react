import styled from "styled-components";
import BlogItem from "../item/BlogItem";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top : 16px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const BlogList = ({blogs}) => { //{}없이 props도 되고 {blogs}로 받아도 됨

    const moveUrl = useNavigate();
    return (
        <Wrapper>
            {
                //BlogItem으로 데이터 props로 전달 
                blogs.map( (blog, idx) => {
                    return (
                        <BlogItem   key={blog.id}
                                    blog={blog} />
                    )
                })
            }
        </Wrapper>
    );
}

export default BlogList ;