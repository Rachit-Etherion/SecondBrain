import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModel } from "../components/ui/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/ui/SideBar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Toast from "../components/ui/Toast";


export function Dashboard () {

    const [modelOpen, setModelOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const {contents, refresh} = useContent();

    useEffect(() => {
        refresh();
    }, [modelOpen])

    const handleShare = async () => {
        try {
        const res = await axios.post(
            `${BACKEND_URL}/api/v1/brain/share`,
            { share: true },
            {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            }
        );

        const shareUrl = `${window.location.origin}/share/${res.data.hash}`;
        await navigator.clipboard.writeText(shareUrl);

        // ✅ show toast
        setToastMessage("Copied share link to clipboard!");
        } catch (err) {
        console.error(err);
        setToastMessage("Failed to copy share link");
        }
    };

    return (
        <div className="">
            <div>
                <SideBar />
            </div>

            <div className="p-4 ml-72 min-h-screen bg-gray-100 ">
                <CreateContentModel open={modelOpen} onClose={() => {
                    setModelOpen(false);
                }}/>
                <div className="flex items-center justify-between pl-2">
                    <div className=" text-2xl font-semibold">
                        All Notes
                    </div>
                    <div className="flex gap-4 justify-end">
                        <Button varients={"secondary"} text={"Share Brain"} startIcon={<ShareIcon />} onClick={handleShare} loading={false}/>
                        <Button varients={"primary"} text={"Add Content"} startIcon={<PlusIcon />} onClick={() => {setModelOpen(true)}} loading={false}/>
                    </div>

                </div>
                <div className="flex gap-4 pt-8 flex-wrap">
                    {/* {JSON.stringify(contents)} */}
                    {contents.map(({type,link,title}) => 
                        <Card
                            type={type}
                            link = {link}
                            title={title}
                        />)}
                </div>

                {/* ✅ Toast shows at bottom right */}
                {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage("")} />
                )}
            </div>
        </div>
    );
}