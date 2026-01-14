import { useParams } from "react-router-dom"

export default function useTitleFromPath() {
    const path = useParams()
    console.log(path)

    return path || 'undefiend'
}