import { useLocation } from "react-router-dom";
import ForecastItem from "./ForecastItem"

const ForecastList = () => {

    const location = useLocation();

    return (
        <div>목록보기
        {   location.state == null ?
            <ForecastItem forecast={"단기예보를 가져오지 못했습니다"} />
            :
            location.state.map( (forecast, idx) => {
                return (
                    <ForecastItem key={idx} forecast={forecast} />
                );
            })
        }
        </div>
    );

}

export default ForecastList ;