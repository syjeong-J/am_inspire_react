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

const Comment = (props) => {
    return(
       <div className='wrapper'>
            <div>
                <img    style={styles.image}
                        src='../../img/Portrait.png'></img>
            </div>
            <div style = {styles.content}>
                <span style = {styles.name}>{props.data.name}</span>
                <span style = {styles.comment}>{props.data.comment}</span>
            </div>
        </div>
    )
}

export default Comment ;