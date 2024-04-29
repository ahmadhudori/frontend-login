/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [expired, setExpired] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpired(decoded.exp);
        } catch (error) {
            if (error) {
                console.log("error di sini");
                navigate("/");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expired * 1000 < currentDate.getTime()) {
                const response = await axios.get("http://localhost:5000/token");
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwtDecode(response.data.accessToken);
                setName(decoded.name);
                setExpired(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
            //   console.log(error);
        }
    );

    const getUsers = async () => {
        const response = await axiosJWT.get("http://localhost:5000/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        setUsers(response.data);
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1>Welcome back : {name}</h1>
                <button onClick={getUsers} className="button is-info">
                    Get Users
                </button>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Name</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Dashboard;
