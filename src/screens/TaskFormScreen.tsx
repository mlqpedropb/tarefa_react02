import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Modal, Text, Portal, Provider } from 'react-native-paper';
import { addTask, updateTask, getTask } from '../services/taskService';

const TaskFormScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params && route.params.taskId) {
      const { taskId } = route.params;
      getTask(taskId).then((task: any) => {
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setPriority(task.priority || '');
        }
      }).catch((error: any) => console.error("Error fetching task:", error));
    }
  }, [route.params]);

  const handleAddOrUpdateTask = async () => {
    if (!title.trim()) {
      alert('Por favor, insira um título para a tarefa.');
      return;
    }

    const task = { title, description, color: priority ? mapPriorityToColor(priority) : '' };
    const taskId = route.params && route.params.taskId;
    if (taskId) {
      await updateTask(taskId, task).then(() => navigation.goBack()).catch((error: any) => console.error("Error updating task:", error));
    } else {
      await addTask(task).then(() => navigation.goBack()).catch((error: any) => console.error("Error adding task:", error));
    }
  };

  const mapPriorityToColor = (priority: string) => {
    switch (priority) {
      case 'Baixa Prioridade':
        return 'green';
      case 'Média Prioridade':
        return 'yellow';
      case 'Alta Prioridade':
        return 'red';
      default:
        return '';
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Button mode="outlined" onPress={() => setModalVisible(true)} style={styles.priorityButton}>
          {priority ? `Prioridade: ${priority}` : 'Definir Prioridade'}
        </Button>
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContent}>
            <RadioButton.Group onValueChange={(value) => setPriority(value)} value={priority}>
              <RadioButton.Item label="Baixa Prioridade" value="Baixa Prioridade" />
              <RadioButton.Item label="Média Prioridade" value="Média Prioridade" />
              <RadioButton.Item label="Alta Prioridade" value="Alta Prioridade" />
            </RadioButton.Group>
            <Button mode="contained" onPress={() => setModalVisible(false)}>Confirmar</Button>
          </Modal>
        </Portal>
        <Button mode="contained" onPress={handleAddOrUpdateTask}>
          {route.params && route.params.taskId ? 'Salvar Alterações' : 'Adicionar Tarefa'}
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  priorityButton: {
    marginBottom: 20, // Adiciona margem inferior ao botão de prioridade
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
  },
});

export default TaskFormScreen;