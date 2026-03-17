import '../../styles/comment.css';
import Comment from '../../components/test/Comment.jsx'

//내부스타일 시트랑 비슷한 형식, 근데 스크립트의 변수 형태 - 적용할 때 className 아니고 styles.content로 
const styles = {
    content : {
        display: "flex",
        flexdirection : "column",
        justifyContent : "center",
        marginLeft : "8px" 
    },
    name : {
        color : "green",
    },
    comment : {
        color : "red",
    },
    image: {
        width: "50px",
        height: "50px",
        borderRadius : "25px"
    }
};

const CommentPage = (props) => {
 //변수선언, 통신, UI(html), 이벤트 처리

    const comments = [
        { 
            name: "임섭순",
            comment : "리액트 처음인데 재미있어요~"
        },
        { 
            name: "섭섭이",
            comment : "저도 리액트 배워보고 싶어요~"
        },
        { 
            name: "섭섭해",
            comment : "목이 아프당~"
        }
    ]
    return (
    //    <div className='wrapper'>
    //         <div>
    //             <img    style={styles.image}
    //                     src='../../img/Portrait.png'></img>
    //         </div>
    //         <div style = {styles.content}>
    //             <span style = {styles.name}>임섭순</span>
    //             <span style = {styles.comment}>처음 배우는 리액트</span>
    //         </div>
            <div>
            {
                comments.map( comment => {
                    return (
                    <Comment data = {comment} />
                    )
                })
            }
            

        </div>
    ) 
}

export default CommentPage ;