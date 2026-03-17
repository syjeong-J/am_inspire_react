import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';

const EventPage = () => {


    const handler = (id,pwd) => {
            console.log(" >>>> handler call", id,pwd);

        };

    const idHandler = (e) => {
        setId(e.target.value)
    }

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    return (

        <div>
            <div>
                <label>아이디</label>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => idHandler(e) }
                    placeholder='아이디를 입력하세요' />
            </div>
               
            <div>
                <label>패스워드</label>
                <input
                    type="text"
                    value={pwd}
                    onChange={(e) => {
                        setPwd(e.target.value) ;
                    } }
                    placeholder='비밀번호를 입력하세요' />
                
            </div>
            <Button variant='primary' onClick={() => handler(id,pwd)}>login</Button>
        </div>
    )
}

export default EventPage ;
