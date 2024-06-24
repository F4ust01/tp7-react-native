import { View } from "react-native";
import { router } from "expo-router";
import { Image, Box, Button, HStack, Text, VStack, Divider, Icon } from "native-base";
import bg from "@/assets/images/index-background.jpeg";
import expoIcon from "@/assets/icons/expo-logo-icon.png";
import nativeBaseIcon from "@/assets/icons/nativebase-logo.png";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image source={bg} style={{ width: '100%', maxHeight: '45%' }} alt="background"></Image>
      <Box width={"80%"} maxHeight={"35%"} flex={1} alignItems={"center"} justifyContent={"space-evenly"}>
        <VStack space={2} width={"100%"} alignItems={"center"}>
          <Text fontSize="xl" fontWeight={"bold"}>Bienvenido a mi aplicación!</Text>
          <Text fontSize={"sm"} textAlign={"center"}>Esta es una aplicación de tareas basica desarrollada con Expo, React Native y NativeBase.</Text>
        </VStack>
        <VStack space={4} width={"55%"}>
          <Button onPress={() => router.push("/login")}>
            Iniciar Sesión
          </Button>
          <Button onPress={() => router.push("/register")}>
            Registrarse
          </Button>
        </VStack>
      </Box>
      <Divider my={5}/>
      <HStack mt={5} space={10} alignItems={"center"}>
        <Icon as={FontAwesome5} name="react" size="4xl" color="black" />
        <Image source={expoIcon} width={"10%"} height={"100%"} alt="expo logo"></Image>
        <Image source={nativeBaseIcon} width={"10%"} height={"105%"} alt="nativebase logo"></Image>
      </HStack>
    </View>
  );
}
