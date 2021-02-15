import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { addPropertyControls, ControlDescription, ControlType } from "framer"
import * as React from "react"
import { Markdown } from "../common/markdown"
import { propertyControls, propEventHandler } from "../common/propertyControl"
import { useDerivedStateCalculatedFromProp } from "../common/state"
import { withTheme } from "../common/theme"

const dateUtil = new DateFnsUtils()

interface Props {
    label?: string,
    helperText?: string,
    value?: string | null,
    format?: string,
    onChangeDate?: (date: Date | null) => void
}
export function DatePicker(props: Props) {
    const { label, helperText, value, format, onChangeDate, ...other } = props
    const defaultDate = value ? dateUtil.parse(value, format) : null as Date
    const state = useDerivedStateCalculatedFromProp(defaultDate, value, (date: Date | null) => onChangeDate && onChangeDate(date))
    state.updateIfDefaultValueChanged(defaultDate, value)
    return withTheme(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                label={<Markdown text={label}/>}
                helperText={<Markdown text={helperText}/>}
                format={format}
                value={state.value}
                onChange={state.setValue}
                {...other}          
            />
        </MuiPickersUtilsProvider>
    )
}

addPropertyControls(DatePicker, propertyControls(
    "label",
    ["value", {
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
    propEventHandler("onChangeDate")
))