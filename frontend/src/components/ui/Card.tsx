import { ShareIcon } from "../../icons/ShareIcon";

interface CardProp {
    title: string;
    link: string;
    type: "Twitter" | "Youtube";
}


export function Card({title, link, type} : CardProp) {
    return (
        <div>    
            <div className=" p-4 bg-white rounded-md max-w-72 border-gray-200 border min-h-48 min-w-72">
                <div className=" flex justify-between items-center">
                    <div className="flex items-center text-md">
                        <div className=" text-gray-500 pr-2">
                            <ShareIcon />
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className=" text-gray-500 pr-2">
                            <a href={link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className=" text-gray-500">
                            <ShareIcon />
                        </div>
                    </div>
                </div>
                <div className=" pt-4">
                    {type === "Youtube" && <iframe 
                        className=" w-full" 
                        src={link.replace("watch", "embed").replace("?v=", "/")}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen>
                    </iframe>}
                    
                    {type === "Twitter"  && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>}
                </div>
            </div>
        </div>
    );
}