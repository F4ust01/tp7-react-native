import { router } from "expo-router";
import { 
    Box, 
    Button, 
    Divider, 
    HStack, 
    Select, 
    Switch, 
    Text, 
    VStack, 
    View,
} from "native-base";
import { useAppContext } from "@/context/AppContext";

export default function Settings() {

    const { 
        theme, 
        switchTheme, 
        timeFormat, 
        setTimeFormat,
        lenguage,
        setLenguage } = useAppContext();

    const lenguages: any = {
        es: {
            darkMode: "Modo Oscuro",
            dateFormat: "Formato de Fecha",
            changeLenguage: "Cambiar Idioma",
            backButton: "Volver"
        },
        en: {
            darkMode: "Dark Theme",
            dateFormat: "Date Format",
            changeLenguage: "Change Language",
            backButton: "Back"
        },
        fr: {
            darkMode: "Thème sombre",
            dateFormat: "Format de Date",
            changeLenguage: "Changer de Langue",
            backButton: "Dos"
        },
        ge: {
            darkMode: "Dunkles Thema",
            dateFormat: "Datumsformat",
            changeLenguage: "Sprache ändern",
            backButton: "Zurück"
        },
        it: {
            darkMode: "Tema Scuro",
            dateFormat: "Formato Data",
            changeLenguage: "Cambia Lingua",
            backButton: "Indietro"
        },
        pt: {
            darkMode: "Tema Escuro",
            dateFormat: "Formato de Data",
            changeLenguage: "Mudar Idioma",
            backButton: "Voltar"
        }
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
            }}
            paddingTop={10}
            backgroundColor={theme === "dark" ? "#151718" : "#fff"}
        >
            <Box width={"80%"} alignItems={"center"} my={5}>
                <HStack width={"100%"} my={2} alignItems={"center"} justifyContent={"space-between"}>
                    <Text color={theme === "dark" ? "#fff" : "#151718"}>
                        {lenguages[lenguage].darkMode}
                    </Text>
                    <Switch size={"lg"} onChange={() => switchTheme()}></Switch>
                </HStack>
                <Divider my={3}></Divider>
                <VStack width={"100%"} my={2} alignItems={"start"}>
                    <Text color={theme === "dark" ? "#fff" : "#151718"}>{lenguages[lenguage].dateFormat}</Text>
                    <Select 
                        color={theme === "dark" ? "#fff" : "#151718"} 
                        defaultValue={timeFormat} 
                        mt={4}
                        onValueChange={(itemValue) => setTimeFormat(itemValue)}
                    >
                        <Select.Item label="Sun Jun 09 2024 14:51:47 GMT-0300" value="1"></Select.Item>
                        <Select.Item label="09/06/2024" value="2"></Select.Item>
                    </Select>
                </VStack>
                <Divider my={3}></Divider>
                <VStack width={"100%"} my={2} alignItems={"start"}>
                    <Text color={theme === "dark" ? "#fff" : "#151718"}>{lenguages[lenguage].changeLenguage}</Text>
                    <Select 
                        color={theme === "dark" ? "#fff" : "#151718"} 
                        defaultValue={lenguage} 
                        // selectedValue={lenguage} 
                        mt={4}
                        onValueChange={(itemValue) => setLenguage(itemValue)}
                    >
                        <Select.Item label="Español" value="es"></Select.Item>
                        <Select.Item label="English" value="en"></Select.Item>
                        <Select.Item label="Français" value="fr"></Select.Item>
                        <Select.Item label="Deutsch" value="ge"></Select.Item>
                        <Select.Item label="Italiano" value="it"></Select.Item>
                        <Select.Item label="Português" value="pt"></Select.Item>
                    </Select>                    
                </VStack>
            </Box>
            <Button onPress={() => router.back()} width={"80%"} position={"absolute"} bottom={10}>{lenguages[lenguage].backButton}</Button>
        </View>
    );
}