import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function Signin () {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signin() {
        console.log("Button clicked!");
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const res = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        });

        const jwt = res.data.token;
        localStorage.setItem("token",jwt);

        navigate("/dashboard")
        
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8 border-gray-300">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="password" />
            <div className=" flex justify-center pt-4">
                <Button onClick={signin} varients="primary" text="SignIn" fullWidth={true} loading={false}/>
            </div>
        </div>
    </div>
}