"use client"


import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { ConfirmModal } from "./confirm-modal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"


interface ActionProps {
    children: React.ReactNode,
    side?: DropdownMenuContentProps['side'],
    sideOffset?: DropdownMenuContentProps['sideOffset'],
    id: string,
    title: string,
}


export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionProps) => {

    const { onOpen }= useRenameModal()

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then( () => toast.success("Link copied to clipboard") )
            .catch( (error) => toast.error("Failed to copy link") )
    }

    
    const {mutate, pending} = useApiMutation(api.board.remove)

    const onDelete = () => {
        mutate( {id} )
            .then( () => toast.success("Board deleted") )
            .catch( (error) => toast.error("Failed to delete board") )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent side={side}
                    sideOffset={sideOffset}
                    className=" w-50"
                    onClick={(e) => e.stopPropagation()}
            >
                <DropdownMenuItem className=" p-3 cursor-pointer"
                    onClick={onCopyLink}>
                    <Link2 className=" h-4 w-4 mr-2" />
                    Copy Board Link
                </DropdownMenuItem>

                <ConfirmModal header="Delete Board ?"
                        description="This will delete the board and all of its content"
                        disabled= {pending}
                        onConfirm={onDelete}>
                    <Button variant="ghost"
                        className=" p-3 cursor-pointer text-red-500 text-sm w-full justify-start font-normal">
                        <Trash2 className=" h-4 w-4 mr-2" />
                        Delete
                    </Button>
                    
                </ConfirmModal>

                <DropdownMenuItem className=" p-3 cursor-pointer"
                    onClick={ () => onOpen(id, title)}>
                    <Pencil className=" h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}