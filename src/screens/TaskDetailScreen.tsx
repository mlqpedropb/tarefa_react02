import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { getTask, deleteTask } from '../services/taskService';

type TaskDetailScreenProps = StackScreenProps<RootStackParamList, 'TaskDetail'>;

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = React.useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    const fetchedTask = await getTask(taskId);
    setTask(fetchedTask);
  };

  const handleDelete = async () => {
    await deleteTask(taskId);
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Deletar tarefa",
      "Tem certeza que deseja deletar a tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: handleDelete,
          style: "destructive",
        },
      ],
    );
  };

  if (!task) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhe das Tarefas" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Título:</Text>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subtitle}>Descrição:</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Button mode="contained" onPress={() => navigation.navigate('TaskForm', { taskId })}>
          Edit
        </Button>
        <Button mode="contained" onPress={confirmDelete} style={styles.deleteButton}>
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red', // Botão de deletar vermelho
  },
});

export default TaskDetailScreen;