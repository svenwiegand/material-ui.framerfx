import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { withTheme } from "../common/theme"
import { ListItem as MuiListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core"
import { Control, DefaultControl } from "../common/propertyControl"
import { Icon } from "./Icon"
import { Avatar, AvatarVariant } from "./Avatar"
import { IconButton } from "../inputs/IconButton"

type ActionType = "none" | "icon"
interface Props {
    primary?: string
    secondary?: string
    avatar?: "none" | "icon" | "avatar"
    avatarSrc?: string
    avatarIcon?: string
    avatarLetters?: string
    avatarVariant?: AvatarVariant
    avatarColor?: string
    secondaryAction?: ActionType
    secondaryActionIcon?: string
    onSeconaryActionClick?: () => void
    button: boolean
    onClick?: () => void
    dense?: boolean
    disabled?: boolean
    disableGutters?: boolean
    divider?: boolean
    selected?: boolean
}

function buildAvatar(props: Props) {
    if (props.avatar === "icon")
        return <ListItemIcon><Icon icon={props.avatarIcon} /></ListItemIcon>
    else if (props.avatar === "avatar")
        return (
            <ListItemAvatar>
                <Avatar
                    src={props.avatarSrc}
                    letters={props.avatarLetters}
                    icon={props.avatarIcon}
                    variant={props.avatarVariant}
                    color={props.avatarColor}
                />
            </ListItemAvatar>
        )
    else
        return undefined
}

function buildSecondaryAction(props: Props) {
    if (props.secondaryAction === "icon")
        return (
            <ListItemSecondaryAction>
                <IconButton 
                    icon={props.secondaryActionIcon}
                    onClick={props.onSeconaryActionClick}
                />
            </ListItemSecondaryAction>
        )
    else
        return undefined
}

export function ListItem(props: Props) {
    const { 
        primary, secondary, 
        avatar, avatarColor, avatarIcon, avatarLetters, avatarSrc, avatarVariant, 
        secondaryAction, secondaryActionIcon, onSeconaryActionClick, 
        ...itemProps 
    } = props
    return withTheme(
        <MuiListItem 
            component="div" {...itemProps}
        >
            {buildAvatar(props)}
            <ListItemText 
                primary={primary} 
                secondary={secondary}
            />
            {buildSecondaryAction(props)}
        </MuiListItem>
    )
}

const whenAvatar = (props: Props) => props.avatar === "avatar"
const whenAvatarOrIcon = (props: Props) => props.avatar !== "none"
const whenAction = (actionType: ActionType) => (props: Props) => props.secondaryAction === actionType
addPropertyControls(ListItem, {
    primary: Control.String("Primary text"),
    secondary: Control.String("Secondary text"),
    // avatar
    avatar: Control.Enum("Before text", ["none", "icon", "avatar"], "none"),
    avatarSrc: Control.Conditional(
        whenAvatar, 
        Control.Image("Image", "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")
    ),
    avatarIcon: Control.Conditional(whenAvatarOrIcon, Control.String("• Icon", "person")),
    avatarLetters: Control.Conditional(whenAvatar, Control.String("• Letters")),
    avatarVariant: Control.Conditional(whenAvatar, Control.Enum("• Variant", ["circle", "rounded", "square"], "circle")),
    avatarColor: Control.Conditional(whenAvatar, Control.Color("• Fallback color", "#b5b5b5")),
    // secondary action
    secondaryAction: Control.Enum("Action button", ["none", "icon"], "none"),
    secondaryActionIcon: Control.Conditional(whenAction("icon"), Control.String("• Action icon", "delete")),
    onSeconaryActionClick: Control.EventHandler(),
    // generic properties
    button: Control.Boolean("Button", true),
    onClick: Control.EventHandler(),
    disabled: DefaultControl.disabled,
    selected: DefaultControl.selected,
    dense: Control.Boolean("Dense", false),
    disableGutters: Control.Boolean("Disable gutters", false),
    divider: Control.Boolean("Divider", false)
})
