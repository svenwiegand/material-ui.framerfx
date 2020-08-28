import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls, InputVariant } from "../common/propertyControl"
import { useDerivedStateCalculatedFromProp } from "../common/state"
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from "@material-ui/core"

interface Props {
    label: string
    options: string[]
    defaultOption: number
    helperText: string
    variant: InputVariant
    onChange: (option: string) => void
    width: number
    height: number
    id: string
}
export function Select(props: Props) {
    const { label, helperText, options, defaultOption, onChange, width, height, id, ...controlProps } = props
    const state = useDerivedStateCalculatedFromProp(defaultOption.toString(), defaultOption, onChange)
    state.updateIfDefaultValueChanged(defaultOption.toString(), defaultOption)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.value)
    return withTheme(
        <FormControl fullWidth {...controlProps}>
            <InputLabel id={id + "_label"}>{label}</InputLabel>
            <MuiSelect 
                labelId={id + "_label"}
                id={id + "_select"}
                label={label}
                value={state.value > "0" ? state.value : ""}
                onChange={handleChange}
            >
                {options.map((option, n) => <MenuItem value={(n + 1).toString()}>{option}</MenuItem>)}
            </MuiSelect>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}

addPropertyControls(Select, propertyControls(
    "label",
    ["options", {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            placeholder: "Label",
            defaultValue: ""
        },
        title: "Options",
        defaultValue: []
    }],
    ["defaultOption", {
        type: ControlType.Number,
        title: "Selection #",
        defaultValue: 0
    }],
    "helperText",
    "variant",
    "color",
    "disabled",
    "required",
    "error",
    "size",
    "onChange"
))