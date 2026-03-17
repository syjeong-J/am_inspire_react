import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const ForecastPage = () => {
    
    const [base_time, setBase_time] = useState("");
    const [base_date, setBase_date] = useState("")
    const [beach_num, setBeach_num] = useState("")
    
    const moveUrl = useNavigate();

    const forcastHandler = async (base_time,base_date,beach_num) => {
        await api.post("/forcast/list",{
            base_time, base_date, beach_num
        })
        .then(response => {
            // console.log(response.data) ;  
            moveUrl("/list",{
                state : response.data
            })
        })
        .catch( err => {
            console.log(err);
        }) ; 
    }

    const moveChat = () => {
        moveUrl("/ai")
    }

    return (
        <div>
        <input  type="text"
                placeholder="예보시간"
                value={base_time}
                onChange={(e) => setBase_time(e.target.value)} /><br/>
        <input  type="text"
                placeholder="예보날짜"
                value={base_date}
                onChange={(e) => setBase_date(e.target.value)} /><br/>
        <input  type="text"
                placeholder="해수욕장번호"
                value={beach_num}
                onChange={(e) => setBeach_num(e.target.value)} /><br/>

        <button onClick={(e) => forcastHandler(base_time,base_date,beach_num)}>예보정보 요청</button>
        <button onClick={(e) => moveChat()}>메시지 작성</button>
        </div>
    );
}

export default ForecastPage ;
