import { PlusIcon } from "../../../assets/icons"
import type { MatrixCardProps } from "../../../utils/types/matrix"
import { MatrixElement } from "./MatrixElement"

export const MatrixCard = ({type, title, description, color, elements}: MatrixCardProps) => {
    return (
        <div 
            style={{ backgroundColor: color }} 
            className="w-full relative flex flex-col"
        >
            <div
                className="absolute flex flex-col items-end justify-center gap-0 bottom-2 right-2"
            >
                <p className="text-xl font-medium uppercase">{title}</p>
                <p className="text-sm font-light italic">{description}</p>
            </div>
            <p className="p-2 uppercase text-sm font-bold opacity-50">{type}</p>
            <div className="p-2 flex flex-wrap gap-2 justify-start items-start">
                {elements.map((element) => (
                    <MatrixElement 
                        id={element.id}
                        title={element.title}
                    />
                ))}
                <button className="
                    w-[30px] h-[30px]
                    rounded-full
                    flex items-center justify-center
                    bg-white/40
                    backdrop-blur-md
                    border border-white/10
                    p-1
                    shadow-sm         /* лёгкая тень для объёма */
                "
                >
                    <PlusIcon />
                </button>
            </div>
        </div>
    )
}