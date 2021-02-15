import { Chip as MuiChip } from "@material-ui/core"
import { addPropertyControls } from "framer"
import * as React from "react"
import { Control } from "../common/propertyControl"
import { withTheme } from "../common/theme"
import { Icon } from "./Icon"
import { Avatar } from "./Avatar"
import { Markdown } from "../common/markdown"

export type ChipProps = {
    label: string
    color?: "default" | "primary" | "secondary"
    variant?: "default" | "outlined"
    size?: "medium" | "small"
    avatar?: "none" | "icon" | "avatar"
    avatarSrc?: string
    avatarIcon?: string
    avatarLetters?: string
    clickable?: boolean
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    deletable?: boolean
    deleteIcon?: string
    onDelete?: (event: React.MouseEvent<HTMLDivElement>) => void
}

function buildAvatar(props: ChipProps) {
    if (props.avatar === "avatar")
        return (
            <Avatar
                src={props.avatarSrc}
                letters={props.avatarLetters}
                icon={props.avatarIcon}
            />
        )
    else
        return undefined
}

function buildIcon(props: ChipProps) {
    if (props.avatar === "icon")
        return <Icon icon={props.avatarIcon} fontSize={props.size} />
    else
        return undefined
}

function buildDeleteIcon(props: ChipProps) {
    if (props.deletable && props.deleteIcon && props.deleteIcon !== "")
        return <Icon icon={props.deleteIcon}/>
    else
        return undefined
}


export function Chip(props: ChipProps) {
    const { label, avatar: avatarChoice, avatarSrc, avatarIcon, avatarLetters, deletable, onDelete, deleteIcon, ...chipProps } = props
    const avatar = buildAvatar(props)
    const icon = buildIcon(props)
    const deleteProps = deletable ? { deleteIcon: buildDeleteIcon(props), onDelete: onDelete ? onDelete : () => {} } : {} 
    return withTheme(
        <MuiChip 
            label={<Markdown text={label}/>}
            avatar={avatar}
            icon={icon}
            {...chipProps}
            {...deleteProps}
        />
    )
}

const whenAvatar = (props: ChipProps) => props.avatar === "avatar"
const whenAvatarOrIcon = (props: ChipProps) => props.avatar !== "none"
const whenAvatarIcon = (props: ChipProps) => props.avatar === "icon"
addPropertyControls(Chip, {
    label: Control.String("Label"),
    color: Control.Enum("Color", ["default", "primary", "secondary"], "default"),
    variant: Control.Enum("Variant", ["default", "outlined"], "default"),
    size: Control.Enum("Size", ["medium", "small"], "medium"),

    // avatar
    avatar: Control.Enum("Avatar", ["none", "icon", "avatar"], "none"),
    avatarSrc: Control.Conditional(
        whenAvatar,
        Control.Image("• Image", "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")
    ),
    avatarIcon: Control.Conditional(whenAvatarOrIcon, Control.String("• Icon", "person")),
    avatarLetters: Control.Conditional(whenAvatar, Control.String("• Letters")),

    // action
    clickable: Control.Boolean("Clickable", true),
    disabled: Control.Boolean("Disabled", false),
    onClick: Control.EventHandler(),

    // delete action
    deletable: Control.Boolean("Deletable", false),
    deleteIcon: Control.Conditional((props: ChipProps) => props.deletable, Control.String("• Icon", "cancel")),
    onDelete: Control.EventHandler(),
})
