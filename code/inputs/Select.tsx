import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core"
import { addPropertyControls, ControlType } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { InputVariant, propertyControls, propEventHandler } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { withTheme } from "../common/theme"

interface Props {
    label: string
    options: string[]
    defaultOption: number
    helperText: string
    variant: InputVariant
    onChangeSelected: (option: number) => void
    width: number
    height: number
    id: string
}
export function Select(props: Props) {
    const { label, helperText, options, defaultOption, onChangeSelected, width, height, id, ...controlProps } = props
    const state = useDerivedState(defaultOption, onChangeSelected)
    state.updateIfDefaultValueChanged(defaultOption)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(Number(event.target.value))
    return withTheme(
        <FormControl fullWidth {...controlProps}>
            <InputLabel id={id + "_label"}><Markdown text={label}/></InputLabel>
            <MuiSelect 
                labelId={id + "_label"}
                id={id + "_select"}
                label={label}
                value={state.value}
                onChange={handleChange}
            >
                {options.map((option, n) => <MenuItem value={n.toString()}><Markdown text={option}/></MenuItem>)}
            </MuiSelect>
            <FormHelperText><Markdown text={helperText}/></FormHelperText>
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
    propEventHandler("onChangeSelected")
))