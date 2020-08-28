import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { Radio as MuiRadio, FormControlLabel, FormLabel, RadioGroup as MuiRadioGroup, FormControl, FormHelperText } from "@material-ui/core"
import { useDerivedStateCalculatedFromProp } from "../common/state"

function buildRadio(label: string, value: string, props) {
    const radio = <MuiRadio
        {...props}
    />
    return <FormControlLabel
        control={radio}
        value={value}
        label={label}
        labelPlacement={props.labelPlacement}
    />
}

interface Props {
    label: string,
    selection: number,
    helperText: string,
    error: boolean,
    required: boolean,
    radioLabels: string[],
    onChange: (selection: number) => void
}
export function RadioGroup(props: Props) {
    const { label, selection, helperText, error, required, radioLabels, onChange, ...radioProps } = props
    const state = useDerivedStateCalculatedFromProp(selection.toString(), selection, (newValue: string) => {
        onChange && onChange(Number.parseInt(newValue))
    })
    state.updateIfDefaultValueChanged(selection.toString(), selection)
    const radios = radioLabels.map((radioLabel, n) => {
        return buildRadio(radioLabel, (n + 1).toString(), radioProps)
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        state.setValue((event.target as HTMLInputElement).value)
    }

    return withTheme(
        <FormControl component="fieldset" error={error} required={required}>
            <FormLabel component="legend">{label}</FormLabel>
            <MuiRadioGroup value={state.value} onChange={handleChange}>
                {radios}
            </MuiRadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}

addPropertyControls(RadioGroup, propertyControls(
    "label",
    ["selection", {
        type: ControlType.Number,
        title: "Selection #",
        defaultValue: 1
    } as ControlDescription],
    "helperText",
    ["radioLabels", {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            placeholder: "Label",
            defaultValue: ""
        },
        title: "Radio buttons",
        defaultValue: []
    } as ControlDescription],
    "color",
    "disabled",
    "required",
    "error",
    "labelPlacement",
    "size",
    "onChange"
))