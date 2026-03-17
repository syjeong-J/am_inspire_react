import { useState, useEffect } from 'react';
import api from '../../api/axios';

const BlogJsonPage = () => {
    console.log(">>>> BlogJsonPage load event");
    const [ary, setAry] = useState([]);

    const getBlogs = async () => {
        const response = await api.get('/blogs');
        console.log("data >>>");
        setAry(response.data) ;

        console.log(ary);
        console.log(ary[0]?.title);
    };
    useEffect(() => {
        getBlogs();
    }, []);
    

    return (
        <div>
            {`data - ${ary[0]?.title}`}
        </div>
    );
}

export default BlogJsonPage ;