"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const EmptyBoards = () => {

    const router = useRouter()
    const {mutate, pending} = useApiMutation(api.board.create)
    const { organization } = useOrganization()

    const onClick = () => {
        if(!organization){
            return 
        }

        mutate( {
            orgId: organization.id,
            title: "Untitled Board"
        })
            .then( (id) => {
                toast.success("Board created")
                router.push(`/board/${id}`)
            })
            .catch( (error) => {
                toast.error("Failed to create board")
            
            })
    }
    

    return (
        <div className="flex flex-col h-full items-center justify-center">

            <Image src="/note.svg"
                height={140}
                width={140}
                alt="Empty"/>

            <h2 className=" mt-6 font-semibold text-2xl">Create your first board!</h2>
            <p className=" mt-2 text-sm text-muted-foreground">Start by calling a board for your organization</p>

            <div className=" mt-6">
                <Button size="lg" onClick={onClick} disabled={pending}>
                    Create Board
                </Button>
            </div>

        </div>
    )
}