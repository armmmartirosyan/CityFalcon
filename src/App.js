import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import CityFalcon from "./pages/CityFalcon";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<CityFalcon/>}/>
                <Route path='/not-found' element={<NotFound/>}/>
                <Route path='/*' element={<Navigate to='/not-found'/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
