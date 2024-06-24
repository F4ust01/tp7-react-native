import RegisterForm from "@/components/RegisterForm";
import { Text, View } from "react-native";
import { Image, Box, HStack, Icon } from "native-base";
import bg from "@/assets/images/background.jpg";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterPage() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
            }}
        >
            <Box
                style={{
                    flex: 1,
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Image source={bg} style={{ width: '100%', maxHeight: '45%' }} alt="background"></Image>
                <RegisterForm></RegisterForm>
                <Box mt={10} flex={1} alignItems={"center"}>
                    <Text>También puedes registrarte con:</Text>
                    <HStack space={10} mt={5}>
                        <Icon as={Ionicons} name="logo-facebook" size="xl" color="#3b5998"></Icon>
                        <Icon as={Ionicons} name="logo-google" size="xl" color="#DB4442"></Icon>
                        <Icon as={Ionicons} name="logo-twitter" size="xl" color="#1D9BF0"></Icon>
                    </HStack>
                </Box>
            </Box>
        </View>
    );
}