import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio as MuiRadio, RadioGroup as MuiRadioGroup } from "@material-ui/core"
import { addPropertyControls, ControlDescription, ControlType } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { propertyControls, propEventHandler } from "../common/propertyControl"
import { useDerivedState } from "../common/state"
import { withTheme } from "../common/theme"

function buildRadio(label: string, value: string, props) {
    const radio = <MuiRadio
        {...props}
    />
    return <FormControlLabel
        control={radio}
        value={value}
        label={<Markdown text={label}/>}
        labelPlacement={props.labelPlacement}
        key={value}
    />
}

interface Props {
    label: string,
    selection: number,
    helperText: string,
    error: boolean,
    required: boolean,
    radioLabels: string[],
    onChangeSelection: (selection: number) => void
}
export function RadioGroup(props: Props) {
    const { label, selection, helperText, error, required, radioLabels, onChangeSelection, ...radioProps } = props
    const state = useDerivedState(selection, onChangeSelection)
    state.updateIfDefaultValueChanged(selection)
    const radios = radioLabels.map((radioLabel, n) => {
        return buildRadio(radioLabel, n.toString(), radioProps)
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        state.setValue(Number((event.target as HTMLInputElement).value))
    }

    return withTheme(
        <FormControl component="fieldset" error={error} required={required}>
            <FormLabel component="legend"><Markdown text={label}/></FormLabel>
            <MuiRadioGroup value={state.value.toString()} onChange={handleChange}>
                {radios}
            </MuiRadioGroup>
            <FormHelperText><Markdown text={helperText}/></FormHelperText>
        </FormControl>
    )
}

addPropertyControls(RadioGroup, propertyControls(
    "label",
    ["selection", {
        type: ControlType.Number,
        title: "Selection #",
        defaultValue: 0
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
    propEventHandler("onChangeSelection")
))