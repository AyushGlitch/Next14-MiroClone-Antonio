import { Room } from "@/components/room"
import { Canvas } from "./_components/canvas"
import { Loading } from "./_components/loading"


interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = (
    { params }: BoardIdPageProps
) => {

    return (
        <Room roomId={params.boardId} fallback={<Loading />}>

            <div className=" h-full">
                <Canvas boardId= {params.boardId} />
            </div>

        </Room>
    )
}


export default BoardIdPage