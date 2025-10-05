import type { ReactElement } from "react";

export interface ButtonProps {
    varients: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    fullWidth?: boolean; 
    onClick?: () => void;
    loading?: boolean
}

const varientStyles = {
    "primary": "bg-purple-900 text-white",
    "secondary": "bg-purple-200 text-purple-900"
}

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center";

export const Button = (props: ButtonProps) => {
    return <button 
        onClick={props.onClick}
        className={varientStyles[props.varients]+" "+defaultStyle+ `${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45" : "cursor-pointer"}`} disabled={props.loading}>
        <div className="pr-2">
            {props.startIcon}
        </div>
        {props.text}
    </button>
};
