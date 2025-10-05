import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter"
}

export function CreateContentModel({open, onClose} : {
    open: boolean;
    onClose: () => void
}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type,setType] = useState(ContentType.Youtube)

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        console.log(localStorage.getItem("token"));

        await axios.post(BACKEND_URL + "/api/v1/content",{
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token") || "" // Including the authorization token
            }
        })
        onClose();
    }
        return <div>
        {open && <div className=" fixed inset-0 flex items-center justify-center">
            <div className=" absolute inset-0 bg-slate-500 opacity-60"></div>
            <div className=" relative bg-white p-4 rounded">
                <div className="flex justify-end cursor-pointer">
                    <div onClick={onClose}>
                        <CrossIcon />
                    </div>
                </div>
                <div>
                    <Input ref={titleRef} placeholder = {"Title"} />
                    <Input ref={linkRef} placeholder = {"Link"} />
                </div>
                <div>
                    <h1 className="font-semibold pl-2 pt-2">Type:</h1>
                    <div className="flex pb-2 justify-center gap-2">
                        <Button text="Youtube" varients={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Youtube)
                        }}></Button>
                        <Button text="Twitter" varients={type === ContentType.Twitter ? "primary" : "secondary"} onClick = {() => {
                            setType(ContentType.Twitter)
                        }}></Button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button onClick={addContent} varients="primary" text="Submit" />
                </div>
            </div>
        </div>
        }
    </div>
}