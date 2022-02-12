import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import clayful from 'clayful/client-js'

function RegisterPage () {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePassowrdChange = (event) => {
        setPassword(event.target.value);
        if(event.target.value.length < 8){
            
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let Customer = clayful.Customer;
    
        let payload = {
            email,
            password,
        };

        console.log(payload);
    
        Customer.createMe(payload, function(err, result) {
    
            if (err) {
                // Error case
                console.log(err.code);
            }
            
            navigate("/login")
        });
    }


    return (
        <div className="pageWrapper">
            <div className="auth-wrapper">
                <h1>회원가입</h1>
    
                <form onSubmit={handleSubmit}>
                    <input placeholder="이메일 아이디를 입력하시오." type="email" name="email" value={email} onChange={handleEmailChange} />
    
                    <input placeholder="패스워드를 입력하시오." type="password" name="password" value={password} onChange={handlePassowrdChange} />
                    <p></p>
                    <button type="submit">회원가입</button>
    
                    <Link to="/login" style={{ color: 'gray', textDecoration: "none"}}>이미 배륩's Store 아이디가 있다면? 지금 로그인.</Link>
                </form>
                
            </div>
        </div>
    )
}

export default RegisterPage