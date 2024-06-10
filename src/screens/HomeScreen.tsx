import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { FAB, Text, Button } from 'react-native-paper';
import TaskCard from '../components/TaskCard';
import { getTasks, deleteTask } from '../services/taskService';

interface Task {
  id: number;
  title: string;
  color: string;
  description?: string;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    const focusListener = navigation.addListener('focus', fetchTasks);
    return () => navigation.removeListener('focus', focusListener);
  }, [navigation]);

  const fetchTasks = async () => {
    setLoading(true);
    const tasks = await getTasks();
    setTasks(tasks);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Deletar Tarefa",
      "Você tem certeza que deseja remover a tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Deletar",
          onPress: async () => {
            await deleteTask(id);
            fetchTasks();
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#6200ee" />
      ) : tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskCard
              title={item.title}
              color={item.color}
              onEdit={() => navigation.navigate('TaskForm', { taskId: item.id })}
              onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
              onLongPress={() => handleDelete(item.id)}
            />
          )}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('TaskForm')}
        color="#ffffff" // Cor do ícone definida como branco
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
  loader: {
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6200ee',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});

export default HomeScreen;