import Login from "./components/Login.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register.js";
import Dashboard from "./components/Dashboard.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
