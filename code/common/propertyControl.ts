import { ControlType, ControlDescription } from "framer"

export type InputColor = "primary" | "secondary" | "default"
export type LabelPlacement = "top" | "end" | "bottom" | "start"
export type InputVariant = "filled" | "outlined" | "standard"

export const PropertyControl = {
    autoFocus: {
        type: ControlType.Boolean,
        title: "Auto focus",
        defaultValue: false
    } as ControlDescription,
    checked: {
        type: ControlType.Boolean,
        title: "Checked",
        defaultValue: false
    } as ControlDescription,
    color: {
        type: ControlType.Enum,
        title: "Color",
        options: ["primary", "secondary", "default"],
        defaultValue: "primary"
    } as ControlDescription,
    defaultStringValue: {
        type: ControlType.String,
        title: "Value",
        defaultValue: ""
    } as ControlDescription,
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false
    } as ControlDescription,
    error: {
        type: ControlType.Boolean,
        title: "Error",
        defaultValue: false
    } as ControlDescription,
    helperText: {
        type: ControlType.String,
        title: "",
        defaultValue: ""
    } as ControlDescription,
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: ""
    } as ControlDescription,
    labelPlacement: {
        type: ControlType.Enum,
        title: "Label placement",
        options: ["bottom", "end", "start", "top"],
        defaultValue: "end"
    } as ControlDescription,
    multiline: {
        type: ControlType.Boolean,
        title: "Multiline",
        defaultValue: false
    } as ControlDescription,
    onChange: {
        type: ControlType.EventHandler,
        title: "onChange",
    } as ControlDescription,
    onClick: {
        type: ControlType.EventHandler,
        title: "onClick",
    } as ControlDescription,
    placeholder: {
        type: ControlType.String,
        title: "Placeholder",
        defaultValue: ""
    } as ControlDescription,
    required: {
        type: ControlType.Boolean,
        title: "Required",
        defaultValue: false
    } as ControlDescription,
    size: {
        type: ControlType.Enum,
        title: "Size",
        options: ["medium", "small"],
        defaultValue: "medium"
    } as ControlDescription,
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["filled", "outlined", "standard"],
        defaultValue: "filled"
    } as ControlDescription,
}

type PropertyControl = typeof PropertyControl
type PropertyControlKey = keyof PropertyControl
type PropertyControlAlias = [string, PropertyControlKey]
type PropertyControlDescription = [string, ControlDescription]
type PropertyControlReference = keyof PropertyControl | PropertyControlAlias | PropertyControlDescription

function isTuple(ctrl: PropertyControlReference): boolean {
    return typeof ctrl === 'object' && ctrl !== null && ctrl.length === 2
}

function isControlDescription(ctrl: PropertyControlReference): ctrl is PropertyControlDescription {
    return isTuple(ctrl) && (ctrl as PropertyControlDescription)[1].type !== undefined
}

function isControlAlias(ctrl: PropertyControlReference): ctrl is PropertyControlAlias {
    return isTuple(ctrl) && !isControlDescription(ctrl)
}

export function propertyControls(...ctrls: PropertyControlReference[]) {
    var picked: Record<string, ControlDescription> = {}
    ctrls.forEach((ctrl) => {
        if (isControlDescription(ctrl))
            picked[ctrl[0]] = ctrl[1]
        else if (isControlAlias(ctrl))
            picked[ctrl[0]] = PropertyControl[ctrl[1]]
        else
            picked[ctrl] = PropertyControl[ctrl]
    })
    return picked;
}