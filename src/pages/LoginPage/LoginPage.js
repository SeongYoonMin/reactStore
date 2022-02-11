import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import clayful from "clayful/client-js"
import { AuthContext } from "../../context/AuthContext";

function LoginPage () {

    const navigate = useNavigate();
    const {isAuthenticated} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePassowrdChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var Customer = clayful.Customer;

        var payload = {
            email,
            password,
        };

        Customer.authenticate(payload, function(err, result) {

            if (err) {
                // Error case
                // console.log(err.code);
                if (err.code === "invalid-password" || err.code === "not-existing-customer") {
                    alert("아이디 혹은 비밀번호가 틀렸습니다.");
                    return;
                }
            }

            var data = result.data;

            localStorage.setItem("customerUID", data.customer);
            localStorage.setItem("accessToken", data.token);
            navigate("/")
            isAuthenticated();

});
    }

    return (
        <div className="pageWrapper">
            <div className="auth-wrapper">
                <h1>로그인</h1>
    
                <form onSubmit={handleSubmit}>
                    <input placeholder="이메일 아이디를 입력하시오." type="email" name="email" value={email} onChange={handleEmailChange} />
    
                    <input placeholder="패스워드를 입력하시오." type="password" name="password" value={password} onChange={handlePassowrdChange} />
    
                    <button type="submit">로그인</button>
    
                    <Link to="/register" style={{ color: 'gray', textDecoration: "none"}}>배륩's Store 회원이 아니시라면? 지금 회원가입</Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage