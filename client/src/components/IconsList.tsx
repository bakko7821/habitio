import { CrossIcon } from "../assets/icons"
import { hintColor, textColor } from "../types/variables"
import { iconsList } from "../utils/icons.links"

type IconsListProps = {
  onSelect: (iconUrl: string) => void
}

export const IconsList = ({ onSelect }: IconsListProps) => {
  return (
    // <div className="absolute z-20 top-full mt-2 w-full max-h-[300px] overflow-y-auto rounded-2xl bg-white shadow-lg p-3">
    //   {iconsList.map(category => (
    //     <div key={category.name} className="mb-4">
    //       <p className="text-sm opacity-60 mb-2">{category.name}</p>

    //       <div className="grid grid-cols-6 gap-3">
    //         {category.icons.map(icon => (
    //           <button
    //             key={icon.id}
    //             type="button"
    //             onClick={() => onSelect(icon.url)}
    //             className="p-2 rounded-xl hover:bg-gray-100"
    //           >
    //             <img src={icon.url} alt="" className="w-6 h-6" />
    //           </button>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xs" />
            <div
                className="pickIconContent relative overflow-y-scroll z-10 w-[85vw] h-[60vh] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/50 shadow-xl p-3 gap-3 flex flex-col"
            >
                <div className="w-full flex items-center justify-between">
                    <p style={{ color: textColor }}
                        className="text-base font-medium"
                    >
                        Иконки
                    </p>
                    <button 
                        style={{ color: textColor }}
                        type="button"
                        className="close p-1"
                    >
                        <CrossIcon />
                    </button>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    {iconsList.map((category) => (
                        <div className="w-full flex flex-col gap-2">
                            <p style={{ color: hintColor }}
                                className="text-sm font-medium text-start">{category.name}</p>
                            <div className="">
                                {category.icons.map((icon) => (
                                    <button 
                                        key={icon.id}
                                        type="button"
                                        onClick={() => onSelect(icon.url)}
                                        style={{ color: textColor }}
                                        className="p-2"
                                    >
                                        <img className="icon" src={icon.url} alt="" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </div>

  )
}
