import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import { withTheme } from "../common/theme"
import { eventHandler, propertyControls } from "../common/propertyControl"
import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core"
import { useDerivedState } from "../common/state"

interface Props {
    label: string,
    labelPlacement: 'end' | 'start' | 'top' | 'bottom',
    checked: boolean,
    onChangeChecked: (checked: boolean) => void
}

export function Checkbox(props: Props) {
    const { label, labelPlacement, checked, onChangeChecked, ...other } = props
    const state = useDerivedState(checked, onChangeChecked)
    state.updateIfDefaultValueChanged(checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => state.setValue(event.target.checked)
    const checkbox = <MuiCheckbox checked={state.value} onChange={handleChange} {...other} />
    return withTheme(
        <FormControlLabel
            control={checkbox}
            label={label}
            labelPlacement={labelPlacement}
        />
    )
}

addPropertyControls(Checkbox, propertyControls(
    "label",
    "checked",
    ["indeterminate", {
        type: ControlType.Boolean,
        label: "Indeterminate",
        defaultValue: false
    } as ControlDescription],
    "color",
    "disabled",
    "required",
    "labelPlacement",
    "size",
    eventHandler("onChangeChecked")
))