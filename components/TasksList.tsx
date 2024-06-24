import { useState, useEffect } from "react"
import { AntDesign } from "@expo/vector-icons"
import { Box, Heading, FlatList, Text, Icon, Spacer, HStack, AddIcon, Modal, Button } from "native-base"
import { task } from "@/types/task"
import NewTaskForm from "./NewTaskForm"
import EditTaskForm from "./EditTaskForm"
import { user } from "@/types/user"
import { getData } from "@/utils/storage"
import { useAppContext } from "@/context/AppContext"

const TasksList = ({ data, setTasks }: { data: Array<task>, setTasks: any }) => {

    const { theme, timeFormat, lenguage } = useAppContext()

    const defaultTask = { 
        id: 0, 
        title: "", 
        description: "", 
        date: "", 
        user_id: 0, 
        done: false 
    }

    const lenguagesText: any = {
        es: "Tareas",
        en: "Tasks",
        fr: "Tâches",
        ge: "Täske",
        it: "Attività",
        pt: "Tarefas",
    }

    const [userTasks, setUserTasks] = useState<Array<task>>([])

    const [addTaskModal, setAddTaskModal] = useState(false)

    const [editTaskModal, setEditTaskModal] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState<task>(defaultTask)
    
    const [deleteTaskModal, setDeleteTaskModal] = useState(false)
    const [confirmDeleteTask, setConfirmDeleteTask] = useState<task>(defaultTask)

    const [showTaskModal, setShowTaskModal] = useState(false)
    const [showTask, setShowTask] = useState<task>(defaultTask)

    const [nameOfUser, setNameOfUser] = useState<string>("")

    useEffect(() => {
        const initializeTasks = async () => {
            const userDataStored = await getData("user")
    
            if (!userDataStored) { 
                throw new Error("Error: no se han encontrado los datos del usuario.")
            }
    
            const userData: user = JSON.parse(userDataStored)
    
            const filteredData = data.filter((task) => task.user_id === userData.id)
    
            setUserTasks(filteredData)
            setNameOfUser(userData.username)
        }
        initializeTasks()
    }, [data])

    const addTask = () => {
        setAddTaskModal(true)
    }

    const editTask = (item: task) => {
        setTaskToEdit(item) 
        setEditTaskModal(true)
    }

    const deleteTask = (item: task) => {
        setConfirmDeleteTask(item)
        setDeleteTaskModal(true)
    }

    const handleDeleteTask = () => {
        const newTaskList = data.filter((task) => task.id !== confirmDeleteTask.id)
        setTasks(newTaskList)
        setDeleteTaskModal(false)
        setConfirmDeleteTask({ id: 0, title: "", description: "", date: "", user_id: 0, done: false })
    }

    const doneTask = (item: task) => {
        const newTask = { ...item, done: !item.done }
        const newTaskList = data.map((task) => task.id === item.id ? newTask : task)
        setTasks(newTaskList)
    }

    const handleShowTask = (taskData: task) => {
        setShowTaskModal(!showTaskModal)
        setShowTask(taskData)
    }

    const handleFormatDate = (currectTaskDate: string) => {
        if (timeFormat === '1') {
            return currectTaskDate
        } else if (timeFormat === '2') {
            const date = new Date(currectTaskDate)

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            return formattedDate
        }
    }

    return (
        <Box alignItems={"center"} w={"80%"} mt={10}>
            <Heading fontSize="xl" p="4" pb="3" color={theme === "dark" ? "white" : "black"}>{lenguagesText[lenguage]}</Heading>
            {
                userTasks.length === 0 ? (
                    <Text color={theme === "dark" ? "white" : "black"}>Todavía no hay tareas</Text>
                ) : (
                    <FlatList
                        data={userTasks}
                        width={"100%"}
                        renderItem={({ item }) => {
                            return (
                                <Box borderBottomWidth="1" width={"100%"} py="2">
                                    <HStack width={"100%"} alignItems={"center"} justifyContent="space-between">
                                        <Text color={theme === "dark" ? "white" : "black"} fontSize="lg" maxWidth={"60%"} bold onPress={() => handleShowTask(item)}>
                                            {item.title}
                                        </Text>
                                        <Spacer  color={theme === "dark" ? "white" : "black"}/>
                                        <HStack w={'30%'} mt={2} justifyContent={'space-between'}>
                                            <Text mt={1} onPress={() => deleteTask(item)}>
                                                <Icon as={AntDesign} color={"#DD4442"} name="delete" size="lg" />
                                            </Text>
                                            <Text mt={1} onPress={() => editTask(item)}>
                                                <Icon as={AntDesign} color={"#1D9BF0"} name="edit" size="lg" />
                                            </Text>
                                            <Text mt={1} onPress={() => doneTask(item)}>
                                                <Icon as={AntDesign} color={"#34aa12"} name={item.done ? "checkcircle" : "checkcircleo"} size="lg" />
                                            </Text>
                                        </HStack>
                                    </HStack>
                                </Box>
                            )
                        }}
                        keyExtractor={item => item.id.toString()} />
                )
            }
            <Modal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Detalles de la Tarea</Modal.Header>
                    <Modal.Body>
                        <Text mt={2}><Text bold>Titulo: </Text>{showTask.title}</Text>
                        <Text mt={2}><Text bold>Descripción: </Text>{showTask.description}</Text>
                        <Text mt={2}><Text bold>Fecha de Creación: </Text>{handleFormatDate(showTask.date)}</Text>
                        <Text mt={2}><Text bold>Creador: </Text>{nameOfUser}</Text>
                        <Text mt={2}>
                            <Text bold>Estado: </Text>
                            <Text color={showTask.done ? "#34aa12" : "#DD4442"}>{showTask.done ? 'Completada' : 'Pendiente'}</Text>
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button w={"100%"} onPress={() => setShowTaskModal(false)}>Cerrar</Button>
                    </Modal.Footer>
                </Modal.Content> 
            </Modal>
            <Modal isOpen={deleteTaskModal} onClose={() => setDeleteTaskModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Eliminar Tarea</Modal.Header>
                    <Modal.Body>
                        <Text>¿Seguro que quieres borrar esta tarea?</Text>
                        <Button colorScheme={"danger"} mt={5} onPress={handleDeleteTask}>Si</Button>
                        <Button colorScheme={"light"} mt={5} onPress={() => setDeleteTaskModal(false)}>No</Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Modal isOpen={editTaskModal} onClose={() => setEditTaskModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Editar Tarea</Modal.Header>
                    <Modal.Body>
                        <EditTaskForm 
                            setEditTaskModal={setEditTaskModal}
                            setTasks={setUserTasks}
                            data={userTasks}
                            taskToEdit={taskToEdit}
                        />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Modal isOpen={addTaskModal} onClose={() => setAddTaskModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Nueva Tarea</Modal.Header>
                    <Modal.Body>
                        <NewTaskForm 
                            setAddTaskModal={setAddTaskModal}
                            setTasks={setUserTasks}
                        />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Text mt={10} onPress={addTask}>
                <AddIcon />
            </Text>
        </Box >
    )
}

export default TasksList