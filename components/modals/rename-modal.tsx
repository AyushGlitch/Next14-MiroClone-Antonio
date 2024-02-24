"use client"


import { FormEventHandler, useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useRenameModal } from "@/store/use-rename-modal"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export const RenameModal = () => {
    const { mutate, pending} = useApiMutation(api.board.update)


    const {
        isOpen,
        onClose,
        initialValues,
    } = useRenameModal()

    const [title, setTitle] = useState(initialValues.title)

    useEffect( () => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        mutate( {
            id: initialValues.id,
            title
        })
            .then( () => {
                toast.success("Board title updated")
                onClose()
            })
            .catch( (error) => toast.error("Failed to update board title"))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>

                <form onSubmit={onSubmit}>
                    <input disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board Title" 
                        className=" p-2"/>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button disabled={pending}
                            type="submit" >
                            Save
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
