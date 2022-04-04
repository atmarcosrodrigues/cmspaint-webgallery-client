import { ButtonHTMLAttributes } from "react"

import './Button.scss';

type ButonProps = ButtonHTMLAttributes<HTMLButtonElement>;
/**
 * Button component
 * @param props 
 * @returns 
 */
export function Button( props: ButonProps){
    return (
        <button className="button-main" {...props} />
    )    
}