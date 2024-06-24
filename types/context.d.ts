export type ProviderValue = {
    userData: {
        username: string;
        password: string;
    };
    login: (username: string, password: string) => void;
    theme: string;
    switchTheme: () => void;
    timeFormat: string;
    setTimeFormat: (timeFormat: string) => void;
    lenguage: Lenguage;
    setLenguage: (language: Lenguage) => void;
}

export type Lenguage = 'es' | 'en' | 'fr' | 'ge' | 'it' | 'pt'