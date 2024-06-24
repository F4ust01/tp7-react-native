import { useState } from "react";
import { View } from "react-native";
import { Box, HStack, Icon, ArrowBackIcon } from "native-base";
import TasksList from "@/components/TasksList";
import { task } from "@/types/task";
import dataTasks from "@/assets/data/tasks.json";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppContext } from "@/context/AppContext";

export default function TasksPage() {

    const { theme } = useAppContext()

    const [ tasks, setTasks ] = useState<Array<task>>(dataTasks);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: theme === "dark" ? "#151718" : "#fff",
            }}
        >
            <Box
                style={{
                    flex: 1,
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <TasksList
                    data={tasks}
                    setTasks={setTasks}
                />
            </Box>
            <HStack position={"absolute"} bottom={5} w={"80%"} justifyContent={"space-between"}>
                <ArrowBackIcon 
                    size={"3xl"}
                    color={"#888888"}
                    onPress={() => {
                        router.back();
                    }}
                >
                </ArrowBackIcon>
                <Icon 
                    as={FontAwesome} 
                    name={"gear"} 
                    color={"#888888"} 
                    size={"3xl"}
                    onPress={() => {
                        router.push("/settings");
                    }}
                ></Icon>
            </HStack>
        </View>
    );
}