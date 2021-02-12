import { Divider, Menu as MuiMenu, MenuItem, PopoverOrigin, Theme } from "@material-ui/core"
import { addPropertyControls, ControlDescription } from "framer"
import * as React from "react"
import { Control, DefaultControl } from "../common/propertyControl"
import { ThemeChoice, ThemeProvider, withSelectedTheme } from "../common/theme"
import { Button, ButtonProps } from "../inputs/Button"
import { IconButton, IconButtonProps } from "../inputs/IconButton"
import { createItems, ItemClickHandler } from "./Menu"

type MenuDefaultButtonProps = Omit<ButtonProps, "href" | "onClick" | "theme">
type MenuIconButtonProps = Omit<IconButtonProps, "href" | "onClick" | "theme">
interface MenuProps {
    buttonType?: string,
    buttonTheme?: ThemeChoice,
    menuTheme?: ThemeChoice,
    items?: string[],
    verticalAnchorOrigin?: PopoverOrigin['vertical']
    horizontalAnchorOrigin?: PopoverOrigin['horizontal']
    verticalTransformOrigin?: PopoverOrigin['vertical']
    horizontalTransformOrigin?: PopoverOrigin['horizontal']
    onItemClicked?: ItemClickHandler
}
type MenuButtonProps = MenuProps & MenuDefaultButtonProps & MenuIconButtonProps
type ButtonClickHandler = { onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }

function MenuDefaultButton(props: MenuButtonProps & ButtonClickHandler) {
    const { label, startIcon, endIcon, variant, buttonTheme, color, disabled, disableElevation, size, fullWidth, onClick } = props
    const buttonProps = { label, startIcon, endIcon, variant, theme: buttonTheme, color, disabled, disableElevation, size, fullWidth, onClick }
    return <Button {...buttonProps}/>
}

function MenuIconButton(props: MenuButtonProps & ButtonClickHandler) {
    const { icon, buttonTheme, color, disabled, size, onClick } = props
    const buttonProps = { icon, theme: buttonTheme, color, disabled, size, onClick }
    return <IconButton {...buttonProps} />
}

function MenuTriggerButton(props: MenuButtonProps & ButtonClickHandler) {
    return props.buttonType === "icon" ? <MenuIconButton {...props}/> : <MenuDefaultButton {...props}/>
}

export function MenuButton(props: MenuButtonProps) {
    const { 
        buttonTheme, menuTheme,
        items,
        verticalAnchorOrigin, horizontalAnchorOrigin, verticalTransformOrigin, horizontalTransformOrigin, 
        onItemClicked
    } = props
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget)
    }
    const handleClose = () => setAnchor(null)
    const handleItemClick = (index: number, label: string) => {
        handleClose()
        onItemClicked && onItemClicked(index, label)
    }
    return (
        <div>
            <MenuTriggerButton onClick={handleClick} {...props} />
            <ThemeProvider theme={menuTheme}>
                <MuiMenu
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{vertical: verticalAnchorOrigin, horizontal: horizontalAnchorOrigin}}
                    transformOrigin={{vertical: verticalTransformOrigin, horizontal: horizontalTransformOrigin}}
                >
                    {createItems(items, handleItemClick)}
                </MuiMenu>
            </ThemeProvider>
        </div>
    )
}

const whenDefaultButton = (control: ControlDescription<MenuProps>) => Control.Conditional((props: MenuProps) => props.buttonType === "default", control)
const whenIconButton = (control: ControlDescription<MenuProps>) => Control.Conditional((props: MenuProps) => props.buttonType === "icon", control)
addPropertyControls(MenuButton, {
    buttonType: Control.Enum("Button type", ["default", "icon"], "default"),

    icon: whenIconButton(Control.String("Icon", "star", "Icon name")),
    label: whenDefaultButton(Control.String("Label", "", "Use 'icon:note' for icon")),
    startIcon: whenDefaultButton(Control.String("Start icon", "", "Icon name")),
    endIcon: whenDefaultButton(Control.String("End icon", "", "Icon name")),
    variant: whenDefaultButton(Control.Enum("Variant", ["text", "contained", "outlined"], "contained")),
    buttonTheme: Control.Enum("Button theme", ["light", "dark"], "light"),
    color: DefaultControl.color,
    disabled: whenDefaultButton(DefaultControl.disabled),
    disableElevation: whenDefaultButton(Control.Boolean("Disable elevation", false)),
    size: Control.Enum("Size", ["small", "medium", "large"], "medium"),
    fullWidth: whenDefaultButton(Control.Boolean("Full width", false)),
    
    menuTheme: Control.Enum("Menu theme", ["light", "dark"], "light"),
    verticalTransformOrigin: Control.Enum("Vertical transform origin", ["top", "center", "bottom"], "top"),
    horizontalTransformOrigin: Control.Enum("Horizontal transform origin", ["left", "center", "right"], "left"),
    verticalAnchorOrigin: Control.Enum("Vertical anchor origin", ["top", "center", "bottom"], "top"),
    horizontalAnchorOrigin: Control.Enum("Horizontal anchor origin", ["left", "center", "right"], "left"),
    onItemClicked: Control.EventHandler(),
    items: Control.Array("Items", Control.String("Label", "", "Label or ---")),
})