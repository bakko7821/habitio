import { useNavigate, useParams } from "react-router-dom"
import { formatDayMonth, shiftDay } from "../utils/date"
import { ArrowIcon } from "../assets/icons"
import { NewTaskInput } from "../components/UI/Todo/NewTaskInput"

export const TodoPage = () => {
    const {date} = useParams()
    const navigate = useNavigate()

    return (
        <>
            <div className="w-full flex items-center justify-between p-4">
                <button 
                    onClick={() => navigate(`/todo/${shiftDay(`${date}`, -1)}`)}
                    className=""><ArrowIcon /></button>
                <p className="text-base font-medium">{formatDayMonth(`${date}`)}</p>
                <button 
                    onClick={() => navigate(`/todo/${shiftDay(`${date}`, +1)}`)}
                    className="transform scale-x-[-1]"><ArrowIcon /></button>
            </div>
            <NewTaskInput />
            <div className="">
                
            </div>
        </>
    )
}