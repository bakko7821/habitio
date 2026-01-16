import { useEffect, useState } from "react"
import { RotatePhoneModal } from "../components/UI/RotatePhoneModal"
import { textColor } from "../utils/types/variables"
import { MatrixCard } from "../components/UI/EisenhowerMatrix/MatrixCard"

export const EisenhowerMatrix = () => {
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    return (
        width >= 450 ? (
            <div className="w-full h-full px-4 pb-4 flex flex-col items-end justify-end">
                <div className="w-full h-full flex">
                    <MatrixCard
                        type="important urgent"
                        title={"Do"} 
                        description={"Do it now"} 
                        color={"#EEC5E8b3"} 
                        elements={[
                            {id: 0, title: "закрыть задачу"},
                            {id: 1, title: "скушать бургер"},
                            {id: 2, title: "убить время"},
                            {id: 3, title: "внимательная покупка молока"},
                        ]}
                    />
                    <div style={{ backgroundColor: textColor }} className="w-1 h-full"></div>
                    <MatrixCard 
                        type="important not urgent"
                        title={"Schedule"} 
                        description={"Save it for later"} 
                        color={"#D5C2F2b3"} 
                        elements={[]}
                    />
                </div>
                <div style={{ backgroundColor: textColor }} className="h-1 w-full"></div>
                <div className="w-full h-full flex">
                    <MatrixCard 
                        type="not important urgent"
                        title={"Delegate"} 
                        description={"Who else can do it?"} 
                        color={"#F7E1ACb3"} 
                        elements={[]} 
                    />
                    <div style={{ backgroundColor: textColor }} className="w-1 h-full"></div>
                    <MatrixCard 
                        type="not important not urgent"
                        title={"Delete"} 
                        description={"Eliminate it"} 
                        color={"#F7BFB7b3"} 
                        elements={[]}
                    />
                </div>
            </div>
        ) : (
            <RotatePhoneModal />
        )
    )
}