import React, { useState } from "react";
import { FormControl, Input, Button, TextArea } from "native-base";
import { task } from "../types/task";

export default function EditTaskForm({ setEditTaskModal, setTasks, data, taskToEdit }: { setEditTaskModal: any, setTasks: any, data: Array<task>, taskToEdit: task }) {

    const [title, setTitle] = useState(taskToEdit.title)
    const [description, setDescription] = useState(taskToEdit.description)

    const handleEditTask = () => {        
        const newTaskList = data.map((task: task) => {
            console.log(task);
            
            return task.id === taskToEdit.id ? 
            { 
                ...task, 
                title: title, 
                description: description 
            } : task
        })
        setTasks(newTaskList)
        setEditTaskModal(false)
    }

    return (
        <FormControl>
            <Input onChangeText={setTitle} value={taskToEdit ? title : ''} />
            <TextArea placeholder="Descripción..." autoCompleteType={"off"} onChangeText={(text) => setDescription(text)} value={taskToEdit ? description : ''} mt={2}></TextArea>
            <Button mt="2" onPress={handleEditTask}>
                Editar Tarea
            </Button>
        </FormControl>
    )
}