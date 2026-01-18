import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { bgColor, secondBgColor, textColor } from "../../utils/types/variables"
import { login, register } from "../../api/auth"

export const RegisterForm = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await register(username, email, password);
            const {id, token} = await login(username, password)
            localStorage.setItem("token", token)
            localStorage.setItem("userId", id)

            navigate("/habits")
        } catch (error: unknown) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleRegister} className="flex flex-col items-center jusify-center gap-10">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                    <div style={{backgroundColor: secondBgColor}} className="floating-input">
                        <input 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" 
                            name="username"
                            id="username"
                            placeholder="@ivanovIvan"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div style={{backgroundColor: secondBgColor}} className="floating-input">
                        <input 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            name="email"
                            id="email"
                            placeholder="ivanov.ivan28@mail.ru"/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div style={{backgroundColor: secondBgColor}} className="floating-input">
                        <input 
                            required
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
                    <Link className="px-2 text-sm" to={"/auth/login"}>Войти</Link>
                    <Link className="px-2 text-sm" to={"/auth/recovery"}>Забыли пароль?</Link>
                </div>
            </div>
            <button 
                style={{backgroundColor: textColor, color: bgColor}} 
                className="text-xl font-medium w-full p-2" 
                type="submit"
            >
                Создать аккаунт
            </button>
        </form>
    )
}