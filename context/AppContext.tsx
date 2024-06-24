import { ProviderValue, Lenguage } from "@/types/context";
import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>({})

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: any) => {

    const [theme, setTheme] = useState("light")

    const [lenguage, setLenguage] = useState<Lenguage>("es")

    const [timeFormat, setTimeFormat] = useState("1")

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const login = (username: string, password: string) => {
        setUserData({username, password})
    }

    const switchTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const providerValue: ProviderValue = {
        userData, 
        login, 
        theme, 
        switchTheme,
        timeFormat,
        setTimeFormat,
        lenguage,
        setLenguage
    }

    return (
        <AppContext.Provider value={providerValue}>
            { children }
        </AppContext.Provider>
    )
}