import type React from "react";


export function Input({ref, placeholder} : {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref?: any;
    placeholder: string
}) {
    return <div>
        <input ref={ref} type={"text"} className=" px-4 py-2 border rounded m-2 border-gray-300" placeholder={placeholder}></input>
    </div>
}