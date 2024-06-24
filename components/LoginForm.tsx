import { useState } from "react"
import { Box, Button, Input, Text, FormControl, Modal } from "native-base"
import { LoginErrors } from "@/types/validationError"
import { router } from "expo-router"
import dataUsers from "@/assets/data/users.json"
import { storeData } from "@/utils/storage"
import { useAppContext } from "@/context/AppContext"

const LoginForm = () => {

    const { login } = useAppContext()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<LoginErrors>({})
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)

    const validate = () => {
        const newErrors: LoginErrors = {};
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/
        if (!username.length) newErrors.name = 'El nombre de usuario es requerido';
        if (username.length < 5) newErrors.name = 'El nombre de usuario debe tener por lo menos 5 caracteres';
        if (username.length > 10) newErrors.name = 'El nombre de usuario debe tener como maximo 10 caracteres';
        if (!password.length) newErrors.password = 'La contraseña es requerida';
        if (password.length < 5) newErrors.password = 'La contraseña debe tener al menos 5 caracteres';
        if (password === password.toUpperCase()) newErrors.password = 'La contraseña debe tener al menos 1 letra minúscula';
        if (password === password.toLowerCase()) newErrors.password = 'La contraseña debe tener al menos 1 letra mayuscula';
        if (!symbolRegex.test(password)) newErrors.password = 'La contraseña debe tener al menos 1 simbolo';
        return newErrors;
    }

    const handleLogin = async () => {
        const validatedErrors: LoginErrors = validate()
        if (Object.keys(validatedErrors).length) {
            setErrors(validatedErrors)
        } else {
            setErrors({})
            const user = dataUsers.find(user => user.username === username && user.password === password)
            if (!user) {
                setIncorrectCredentials(true)
            } else {
                login(username, password)
                await storeData("user", JSON.stringify(user))
                return router.push("/tasks")
            }
        }
    }

    return (
        <Box alignItems={"center"} w={"80%"} mt={10}>
            <Modal isOpen={incorrectCredentials} onClose={() => setIncorrectCredentials(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Error</Modal.Header>
                    <Modal.Body>Usuario o contraseña incorrectos</Modal.Body>
                </Modal.Content>
            </Modal>
            <Text>Iniciar Sesión</Text>
            <FormControl isInvalid={errors.hasOwnProperty('name')}>
                <Input 
                    variant="underlined" 
                    size="lg" 
                    mt={5} 
                    placeholder="Nombre de Usuario" 
                    onChangeText={(value: string) => setUsername(value)}
                    value={username}
                />
                {
                    errors.hasOwnProperty('name') ? 
                        <Text color={"red.500"}>{errors.name}</Text> : null
                }
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('password')} >
                <Input 
                    variant="underlined" 
                    size="lg" 
                    mt={5} 
                    placeholder="Contraseña" 
                    type="password" 
                    onChangeText={(value: string) => setPassword(value)}
                    value={password}
                />
                {
                    errors.hasOwnProperty('password') ? 
                        <Text color={"red.500"}>{errors.password}</Text> : null
                }
            </FormControl>
            <Button w={"100%"} mt={5} onPress={handleLogin}>Iniciar Sesión</Button>
        </Box>
    )
}

export default LoginForm