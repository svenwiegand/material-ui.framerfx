import { Menu as MuiMenu, PopoverOrigin } from "@material-ui/core"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Control } from "../common/propertyControl"
import { ThemeChoice, ThemeProvider } from "../common/theme"
import { Button, buttonPropertyControls, ButtonProps } from "../inputs/Button"
import { IconButton, iconButtonPropertyControls, IconButtonProps } from "../inputs/IconButton"
import { createItems, ItemClickHandler } from "./Menu"

type ButtonType = "default" | "icon"
type MenuDefaultButtonProps = Omit<ButtonProps, "href" | "onClick">
type MenuIconButtonProps = Omit<IconButtonProps, "href" | "onClick">
interface MenuButtonProps {
    buttonType?: ButtonType,
    defaultButtonProps?: MenuDefaultButtonProps,
    iconButtonProps?: MenuIconButtonProps,
    theme?: ThemeChoice,
    items?: string[],
    verticalAnchorOrigin?: PopoverOrigin['vertical']
    horizontalAnchorOrigin?: PopoverOrigin['horizontal']
    verticalTransformOrigin?: PopoverOrigin['vertical']
    horizontalTransformOrigin?: PopoverOrigin['horizontal']
    onItemClicked?: ItemClickHandler
}

export function MenuButton(props: MenuButtonProps) {
    const { 
        buttonType,
        defaultButtonProps, 
        iconButtonProps,
        theme,
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
            {buttonType === "icon" ?
                <IconButton {...iconButtonProps} onClick={handleClick} /> :
                <Button {...defaultButtonProps} onClick={handleClick} />
            }
            <ThemeProvider theme={theme}>
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

addPropertyControls(MenuButton, {
    buttonType: Control.Enum("Button type", ["default", "icon"], "default"),
    defaultButtonProps: Control.Conditional(
        props => props.buttonType === "default", 
        Control.Object("Button", { ...buttonPropertyControls, href: undefined, onClick: undefined })
    ),
    iconButtonProps: Control.Conditional(
        props => props.buttonType === "icon",
        Control.Object("Button", { ...iconButtonPropertyControls, href: undefined, onclick: undefined })
    ),
    theme: Control.Enum("Theme", ["light", "dark"], "light"),
    verticalTransformOrigin: Control.Enum("Vertical transform origin", ["top", "center", "bottom"], "top"),
    horizontalTransformOrigin: Control.Enum("Horizontal transform origin", ["left", "center", "right"], "left"),
    verticalAnchorOrigin: Control.Enum("Vertical anchor origin", ["top", "center", "bottom"], "top"),
    horizontalAnchorOrigin: Control.Enum("Horizontal anchor origin", ["left", "center", "right"], "left"),
    onItemClicked: Control.EventHandler(),
    items: Control.Array("Items", Control.String("Label", "", "Label or ---")),
})