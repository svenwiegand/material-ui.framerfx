import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core"
import { addPropertyControls, ControlType } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { Control, DefaultControl, FormControlControls, FormControlLabelControls, InputVariant, propertyControls, propEventHandler } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { withTheme } from "../common/theme"

interface Props {
    label: string
    options: string[]
    value: number
    helperText: string
    variant: InputVariant
    onChangeSelected: (option: number) => void
    calculateSelection?: (option: number) => number
    width: number
    height: number
    id: string
}
export function Select(props: Props) {
    const { label, helperText, options, value, onChangeSelected, width, height, id, ...controlProps } = props
    const state = useDerivedState(value, onChangeSelected)
    state.updateIfDefaultValueChanged(value)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(Number(event.target.value))
    return withTheme(
        <FormControl fullWidth hiddenLabel={!label} {...controlProps}>
            <InputLabel id={id + "_label"}><Markdown text={label}/></InputLabel>
            <MuiSelect 
                labelId={id + "_label"}
                id={id + "_select"}
                label={label}
                value={state.value}
                onChange={handleChange}
            >
                {options.map((option, n) => <MenuItem key={option} value={n.toString()}><Markdown text={option}/></MenuItem>)}
            </MuiSelect>
            <FormHelperText><Markdown text={helperText}/></FormHelperText>
        </FormControl>
    )
}

const { disableUnderline, ...formControlControls } = FormControlControls
addPropertyControls(Select, {
    ...FormControlLabelControls,
    options: Control.Array("Options", Control.String("Label", "", "Label")),
    value: Control.Number("Selection #", 0),
    ...formControlControls,
    onChangeSelected: Control.EventHandler()
})