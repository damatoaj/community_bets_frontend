import {  optionProps, optionsProps } from "@/interfaces/props"
import Option from "./Option"


const Options = (props : optionsProps) => {
    const { options } = props;
    return<>{
            options.map((option: optionProps, i : number) => {
                return <Option 
                    l={option.l} 
                    v={option.v} 
                    t={option.t ?? option.l} 
                    key={i}
            />
        })}
    </>
};

export default Options;