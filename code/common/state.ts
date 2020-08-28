import React = require("react");

/**
 * Encapsulated React state generated by {@link useDerivedState}.
 * 
 * Use `value` to access the state and `setValue()` to change it.
 * 
 * Call {@link updateIfDefaultValueChanged} to automatically update the state if the default value property has changed.
 */
export interface DerivedState<T, Prop = undefined> {
    /** Current state */
    value: T
    /** Set current state */
    setValue: (newState: T) => void

    /**
     * Update state if the default value changed.
     * 
     * @param newDefaultValue the new value the state should be set to if the default changed
     * @param newDefaultValueProp the underlying property of `newDefaultValue` that should be compared to its previous state
     * to determine whether the default changed. If not sepcified `newDefaultValue` will be used for comparison.
     * See {@link useDerivedState} for further details.
     */
    updateIfDefaultValueChanged: (newDefaultValue: T, newDefaultValueProp?: Prop) => void
}

/**
 * Creates a React state which is derived from the specified `defaultValue`. Thus the state can not only be updated directly
 * using the `setValue()` method on the returned object, but will also update if the default value (or its underlying prop) 
 * changes.
 * @param defaultValue the default value of the initial state
 * @param defaultValueProp the original property the `defaultValue` is derived from. If this one changes, the state will be
 * updated. If not specified, `defaultValue` will be compared directly instead. This one is important if the `defaultValue` is an 
 * object which is calculated from a property. In this case each calculation will result in another object even if the property 
 * did not change at all and thus the state would always be changed.
 * @param onChange change listener that should be called each time the state is updated.
 */
export function useDerivedStateCalculatedFromProp<T, Prop = undefined>(
    defaultValue: T, 
    defaultValueProp?: Prop,
    onChange?: (newValue: T) => void
): DerivedState<T, Prop> {
    const [value, setValue] = React.useState(defaultValue)
    const [prevDefaultValue, setPrevDefaultValue] = React.useState(defaultValueProp ? defaultValueProp : defaultValue)
    return new class implements DerivedState<T, Prop> {
        value = value
        setValue = (newState: T) => {
            setValue(newState)
            onChange && onChange(newState)
        }
        defaultValue = prevDefaultValue
        setDefaultValue = setPrevDefaultValue
        updateIfDefaultValueChanged(newDefaultValue: T, newDefaultValueProp?: Prop) {
            const newDefault = newDefaultValueProp ? newDefaultValueProp : newDefaultValue
            if (newDefault !== this.defaultValue) {
                this.setValue(defaultValue)
                this.setDefaultValue(newDefault)
            }
        }
    }
}

/** Shorthand for {@link useDerivedStateCalculatedFromProp} */
export function useDerivedState<T>(defaultValue: T, onChange?: (newValue: T) => void): DerivedState<T> {
    return useDerivedStateCalculatedFromProp(defaultValue, undefined, onChange)
}