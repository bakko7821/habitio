import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { bgColor, secondBgColor, textColor } from "../../utils/types/variables"
import { login } from "../../api/auth"

export const LoginForm = () => {
    const navigate = useNavigate()
    const [username, setUsename] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        try {
            const {id, token} = await login(username, password)
            localStorage.setItem("token", token)
            localStorage.setItem("userId", id)

            navigate("/habits")
        } catch (error: unknown) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col items-center jusify-center gap-10">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                    <div style={{backgroundColor: secondBgColor}} className="floating-input">
                        <input 
                            value={username}
                            onChange={(e) => setUsename(e.target.value)}
                            type="text" 
                            name="username"
                            id="username"
                            placeholder="@ivanovIvan"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div style={{backgroundColor: secondBgColor}} className="floating-input">
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            name="password"
                            id="password"
                            placeholder="Your password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-2">
                    <Link className="px-2 text-sm" to={"/auth/register"}>Регистрация</Link>
                    <Link className="px-2 text-sm" to={"/auth/recovery"}>Забыли пароль?</Link>
                </div>
            </div>
            <button 
                style={{backgroundColor: textColor, color: bgColor}} 
                className="text-xl font-medium w-full p-2" 
                type="submit"
            >
                Войти
            </button>
        </form>
    )
}