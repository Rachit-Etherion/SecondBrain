
export interface ButtonProps {
    varients: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    startIcon?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endIcon?: any;
    onClick: () => void;
}

const varientStyles = {
    "primary": "bg-purple-900 text-white",
    "secondary": "bg-purple-200 text-purple-900"
}

export const Button = (props: ButtonProps) => {
    return <button 
        onClick={props.onClick}
        className={varientStyles[props.varients]}>
        {props.text}
    </button>
};
