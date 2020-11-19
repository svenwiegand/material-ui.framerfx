import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { useDerivedState } from "../common/state"

const dateUtil = new DateFnsUtils()

export function DatePicker(props: any) {
    const { defaultValue, format, onChange, width, height, ...other } = props
    const defaultDate = defaultValue ? dateUtil.parse(defaultValue, format) : null as Date
    const state = useDerivedState(defaultDate, onChange)
    state.updateIfDefaultValueChanged(defaultValue)
    const handleChange = (date: Date, value: string) => state.setValue(date)
    return withTheme(<MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            format={format}
            margin="normal"
            value={state.value}
            onChange={handleChange}
            {...other}          
        />
    </MuiPickersUtilsProvider>)
}

addPropertyControls(DatePicker, propertyControls(
    "label",
    ["defaultValue", {
        type: ControlType.String,
        title: "Date",
        defaultValue: ""
    }],
    ["format", {
        type: ControlType.String,
        title: "Format",
        defaultValue: "dd.MM.yyyy"
    }],
    "placeholder",
    "helperText",
    ["variant", {
        type: ControlType.Enum,
        title: "Variant",
        options: ["inline", "dialog"],
        default: "inline"
    } as ControlDescription],
    ["disableToolbar", {
        type: ControlType.Boolean,
        title: "Hide toolbar",
        defaultValue: false
    }],
    "color",
    "disabled",
    "required",
    "error",
    "size",
    "onChange"
))