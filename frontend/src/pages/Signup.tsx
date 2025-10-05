import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Signup () {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signup() {
        console.log("Button clicked!");
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });
            navigate("/signin");
            // alert("You have signe Up!");
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(err: any) {
            if(err.response) {
                navigate("/signin");
                alert(err.response.data.message)
            }  else {
                alert("Signup failed!")
            }
        }
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8 border-gray-300">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />
            <div className=" flex justify-center pt-4">
                <Button onClick={signup} varients="primary" text="SignUp" fullWidth={true} loading={false}/>
            </div>
        </div>
    </div>
}