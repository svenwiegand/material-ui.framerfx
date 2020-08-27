import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core"

export function Checkbox(props: any) {
    const { label, labelPlacement, checked, onChange, ...other } = props
    const [state, setState] = React.useState(checked)
    const [prevChecked, setPrevChecked] = React.useState(checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.checked)
        if (onChange) onChange()
    }

    if (checked !== prevChecked) {
        setState(checked)
        setPrevChecked(checked)
    }

    const checkbox = <MuiCheckbox checked={state} onChange={handleChange} {...other} />
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
    "onChange"
))