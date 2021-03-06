import { Checkbox as MuiCheckbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@material-ui/core"
import { addPropertyControls, ControlDescription, ControlType } from "framer"
import * as React from "react"
import { Dispatch, SetStateAction } from "react"
import { Markdown } from "../common/markdown"
import { propertyControls, propEventHandler } from "../common/propertyControl"
import { useDerivedStateCalculatedFromProp } from "../common/state"
import { withTheme } from "../common/theme"

interface CheckboxState {
    label: string,
    checked: boolean,
    indeterminate: boolean
}

function getCheckboxStateFromLabel(label: string): CheckboxState {
    const result = (label: string, checked: boolean, indeterminate: boolean): CheckboxState =>
        ({ label, checked, indeterminate })

    if (label.endsWith("(x)"))
        return result(label.substr(0, label.length - 3).trim(), true, false)
    else if (label.endsWith("(-)"))
        return result(label.substr(0, label.length - 3).trim(), true, true)
    else
        return result(label.trim(), false, false)
}

function buildCheckbox(label: string, state: () => boolean, setState: Dispatch<SetStateAction<boolean>>, props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setState(event.target.checked)
    const checkboxState = getCheckboxStateFromLabel(label)
    const checkbox = <MuiCheckbox
        checked={state()}
        indeterminate={checkboxState.indeterminate}
        onChange={handleChange}
        {...props}
    />
    return <FormControlLabel
        control={checkbox}
        label={<Markdown text={checkboxState.label}/>}
        labelPlacement={props.labelPlacement}
    />
}

interface Props {
    label: string,
    helperText: string,
    error: boolean,
    required: boolean,
    checkboxLabels: string[],
    onChangeSelection: (event: {checked: boolean[]}) => void
}
export function CheckboxGroup(props: Props) {
    const { label, helperText, error, required, checkboxLabels, onChangeSelection, ...checkBoxProps } = props

    const stateFromLabels = () => checkboxLabels.map((label) => getCheckboxStateFromLabel(label).checked)
    const state = useDerivedStateCalculatedFromProp(stateFromLabels(), checkboxLabels, (checked) => {checked})
    state.updateIfDefaultValueChanged(stateFromLabels(), checkboxLabels)

    const checkboxes = checkboxLabels.map((checkboxLabel, n) => {
        const checkboxState = () => state.value[n]
        const setCheckboxState = (checked: boolean) => {
            const newState = [...state.value]
            newState[n] = checked
            state.setValue(newState)
        }
        return buildCheckbox(checkboxLabel, checkboxState, setCheckboxState, checkBoxProps)
    })

    return withTheme(
        <FormControl component="fieldset" error={error} required={required}>
            <FormLabel component="legend"><Markdown text={label}/></FormLabel>
            <FormGroup>
                {checkboxes}
            </FormGroup>
            <FormHelperText><Markdown text={helperText}/></FormHelperText>
        </FormControl>
    )
}

addPropertyControls(CheckboxGroup, propertyControls(
    "label",
    "helperText",
    ["checkboxLabels", {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
            placeholder: "End with '(x)' or '(-)' to check",
            defaultValue: ""
        },
        title: "Checkboxes",
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