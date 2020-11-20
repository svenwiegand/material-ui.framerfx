import * as React from "react"
import { addPropertyControls, ControlType, ControlDescription } from "framer"
import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { withTheme } from "../common/theme"
import { propertyControls } from "../common/propertyControl"
import { useDerivedStateCalculatedFromProp } from "../common/state"

const dateUtil = new DateFnsUtils()

interface Props {
    defaultValue: string | null,
    format: string,
    onChange: (date: Date | null) => void
}
export function DatePicker(props: Props) {
    const { defaultValue, format, onChange, ...other } = props
    const defaultDate = defaultValue ? dateUtil.parse(defaultValue, format) : null as Date
    const state = useDerivedStateCalculatedFromProp(defaultDate, defaultValue, onChange)
    state.updateIfDefaultValueChanged(defaultDate, defaultValue)
    return withTheme(<MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            format={format}
            value={state.value}
            onChange={state.setValue}
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
    "margin",
    "disabled",
    "required",
    "error",
    "size",
    "onChange"
))