import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/apiCalls'

const Login = () => {
    const [username, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    return (
        <div 
        style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <input
                style={{ padding: 10, marginBottom: 5 }}
                type="text"
                placeholder="username"
                onChange={(e) => setuserName(e.target.value)}
            />

            <input
                style={{ padding: 10, marginBottom: 5 }}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleClick} style={{ padding: 10, width: 100 }}
            >Login
            </button>
        </div>
    );
};

export default Login
