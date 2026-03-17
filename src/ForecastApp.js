import {BrowserRouter, Routes, Route} from 'react-router-dom' ;
import ForecastPage from './features/forecast/ForecastPage';
import ForecastList from './features/forecast/ForecastList';
import AiChatPage from './features/forecast/AiChatPage';


const ForecastApp =() => {

    return(
        <BrowserRouter>
            
            <Routes>
                <Route path='/'         element={ <ForecastPage /> } /> 
                <Route path='/list'     element={ <ForecastList /> } /> 
                <Route path='/ai'       element={ <AiChatPage /> } /> 
            </Routes>
        </BrowserRouter>
    );
}

export default ForecastApp ;