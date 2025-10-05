import { useNavigate } from "react-router-dom";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Button } from "./Button";
import { SideBarItem } from "./SideBarItem";


export function SideBar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };


    return <div className=" h-screen bg-white border-r-2 w-72 fixed left-0 top-0 border-gray-200 flex flex-col justify-between">
        <div className="pl-6">
            <div className=" flex text-2xl pt-6 items-center">
                <div className="pr-4 text-purple-900">
                    <Logo /> 
                </div>
                Second Brain
            </div>
            
            <div className=" pt-8 pl-4">
                <SideBarItem text="Twitter" icon={<TwitterIcon />} />
                <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
            </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-center">
            <Button varients="primary" text="LogOut" onClick={handleLogout} fullWidth={true}/>
        </div>
    </div>
}