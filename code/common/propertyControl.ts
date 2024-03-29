import { ControlDescription, ControlType, EnumControlDescription, ObjectPropertyControlDescription, PropertyControls } from "framer"

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
        options: ["inherit", "primary", "secondary", "default"],
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
    margin: {
        type: ControlType.Enum,
        title: "Margin",
        options: ["none", "dense", "normal"],
        defaultValue: "normal"
    } as ControlDescription,
    multiline: {
        type: ControlType.Boolean,
        title: "Multiline",
        defaultValue: false
    } as ControlDescription,
    onClick: {
        type: ControlType.EventHandler,
        title: "onClick",
    } as ControlDescription,
    onTap: {
        type: ControlType.EventHandler,
        title: "onTap",
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

export const propArray = (propertyName: string, title: string, propertyControl: PropertyControlReference, maxCount?: number) => [
    propertyName, {
        type: ControlType.Array,
        title,
        propertyControl: propertyControl[1]
    }
] as PropertyControlDescription
export const propBoolean = (propertyName: string, title: string, defaultValue?: boolean, enabledTitle?: string, disabledTitle?: string) => [
    propertyName, {
        type: ControlType.Boolean,
        title,
        defaultValue,
        enabledTitle,
        disabledTitle
    }
] as PropertyControlDescription
export const propComponentInstance = (propertyName: string, title?: string) => [
    propertyName, {
        type: ControlType.ComponentInstance,
        title
    }
] as PropertyControlDescription
export const propEnum = 
    (propertyName: string, title: string, defaultValue: string, options: string[], optionTitles?: string[]) => 
    [
        propertyName, {
            type: ControlType.Enum,
            title: title,
            defaultValue,
            options,
            optionTitles
        }
    ] as PropertyControlDescription
export const propEventHandler = (propertyName: string, title?: string) => [
    propertyName, {
        type: ControlType.EventHandler,
        title: title ? title : propertyName
    }
] as PropertyControlDescription
export const propNumber = (propertyName: string, title: string, defaultValue?: number, min?: number, max?: number, step?: number) => [
    propertyName, {
        type: ControlType.Number,
        title,
        defaultValue,
        min,
        max,
        step
    }
] as PropertyControlDescription 
export const propString = (propertyName: string, title: string, defaultValue?: string, placeholder?: string) => [
    propertyName, {
        type: ControlType.String,
        title,
        defaultValue,
        placeholder
    }
] as PropertyControlDescription


///////////////////////////////////////////////////////////////////////////////
// NEW WORLD STARTS HERE

export const Control = {
    Array: <P>(title: string, control: any, maxCount?: number): ControlDescription<P> => ({
        type: ControlType.Array,
        title,
        control,
        maxCount
    }),
    Boolean: <P>(title: string, defaultValue: boolean = false, enabledTitle?: string, disabledTitle?: string): ObjectPropertyControlDescription<P> => ({
        type: ControlType.Boolean,
        title,
        defaultValue,
        enabledTitle,
        disabledTitle
    }),
    Color: <P>(title: string, defaultValue?: string): ObjectPropertyControlDescription<P> => ({
        type: ControlType.Color,
        title,
        defaultValue
    }),
    ComponentInstance: <P>(title: string): ControlDescription<P> => ({
        type: ControlType.ComponentInstance,
        title
    }),
    Conditional: <P>(show: (props: P) => boolean, control: ControlDescription<P>) => ({
        ...control,
        hidden: (props: P) => !show(props)
    }),
    ConditionalProperty: <P>(show: (props: P) => boolean, control: ObjectPropertyControlDescription<P>) => ({
        ... control,
        hidden: (props: P) => !show(props)
    }),
    Enum: <P>(title: string, options: string[], defaultValue: string, optionTitles?: string[]): ObjectPropertyControlDescription<P> => ({
        type: ControlType.Enum,
        title,
        defaultValue,
        options,
        optionTitles
    }),
    EventHandler: <P>(title?: string): ControlDescription<P> => ({
        type: ControlType.EventHandler,
        title
    }),
    FusedNumber: <P>(
        title: string, 
        defaultValue: number, 
        toggleKey: keyof P, 
        toggleTitles: [string, string], 
        valueKeys: [keyof P, keyof P, keyof P, keyof P], 
        valueLabels: [string, string, string, string], 
        min?: number
    ): ControlDescription<P> => ({
        type: ControlType.FusedNumber,
        title,
        defaultValue,
        toggleKey,
        toggleTitles,
        valueKeys,
        valueLabels,
        min
    }),
    Image: <P>(title: string, defaultValue?: string): ObjectPropertyControlDescription<P> => ({
        type: ControlType.Image,
        title,
        defaultValue
    }),
    Number: <P>(title: string, defaultValue?: number, min?: number, max?: number, step?: number): ObjectPropertyControlDescription<P> => ({
        type: ControlType.Number,
        title,
        defaultValue,
        min,
        max,
        step
    }),
    Object: <P>(title: string, controls: { [key: string]: ObjectPropertyControlDescription }): ControlDescription<P> => ({
        type: ControlType.Object,
        title,
        controls,
    }),
    String: <P>(title: string, defaultValue?: string, placeholder?: string, displayTextArea?: boolean): ObjectPropertyControlDescription<P> => ({
        type: ControlType.String,
        title,
        defaultValue,
        placeholder,
        displayTextArea
    })
}

export const DefaultControl = {
    autoFocus: Control.Boolean("Auto focus", false),
    checked: Control.Boolean("Checked", false),
    color: Control.Enum("Color", ["inherit", "primary", "secondary", "default"], "primary"),
    defaultStringValue: Control.String("Value", ""),
    dense: Control.Boolean("Dense", false),
    disabled: Control.Boolean("Disabled", false),
    disableGutters: Control.Boolean("Disable gutters", false),
    error: Control.Boolean("Error", false),
    fullWidth: Control.Boolean("Full width", true),
    helperText: Control.String("Helper text", ""),
    inputVariant: Control.Enum("Variant", ["filled", "outlined", "standard"], "filled"),
    label: Control.String("label", ""),
    labelPlacement: Control.Enum("Label placement", ["bottom", "end", "start", "top"], "end"),
    multiline: Control.Boolean("Multiline", false),
    onClick: Control.EventHandler(),
    padding: Control.FusedNumber("Padding", 0, "mixedPadding", ["Padding", "Padding per edge"], ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"], ["T", "R", "B", "L"], 0),
    placeholder: Control.String("Placeholder"),
    required: Control.Boolean("Required", false),
    selected: Control.Boolean("Selected", false),
    size: Control.Enum("Size", ["medium", "small"], "medium"),
    theme: Control.Enum("Theme", ["light", "dark"], "light"),
}

export const FormControlLabelControls: PropertyControls<FormControl> = {
    label: DefaultControl.label,
    helperText: DefaultControl.helperText
}

export const FormControlControls: PropertyControls<FormControl> = {
    variant: DefaultControl.inputVariant,
    disableUnderline: Control.Conditional(
        props => props.variant === "standard" || props.variant === "filled", 
        Control.Boolean("Disable Underline")
    ),
    color: DefaultControl.color,
    required: DefaultControl.required,
    error: DefaultControl.error,
    disabled: DefaultControl.disabled,
    fullWidth: DefaultControl.fullWidth,
    size: DefaultControl.size,
    autoFocus: DefaultControl.autoFocus,
}