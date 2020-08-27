import { ControlType, ControlDescription } from "framer"

export const PropertyControl = {
    autoFocus: {
        type: ControlType.Boolean,
        title: "Auto focus",
        defaultValue: false
    } as ControlDescription,
    color: {
        type: ControlType.Enum,
        title: "Color",
        options: ["primary", "secondary"],
        defaultValue: "primary"
    } as ControlDescription,
    defaultValue: {
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
        title: "Helper text",
        defaultValue: ""
    } as ControlDescription,
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Label"
    } as ControlDescription,
    multiline: {
        type: ControlType.Boolean,
        title: "Multiline",
        defaultValue: false
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

export function propertyControls(...keys: PropertyControlKey[]) {
    var picked: Partial<typeof PropertyControl> = {}
    keys.forEach((key) => picked[key] = PropertyControl[key])
    return picked;
}