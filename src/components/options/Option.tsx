import { optionProps } from "@/interfaces/props"

export default function Option(option: optionProps) {
    return (
        <option 
            value={option.v}
            title={option.t !== null ? option.t : option.l}
        >
            {option.l}
        </option>
    )
};