import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialColor?: string;
  onSubmit: (title: string, description: string, color: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTitle = '', initialDescription = '', initialColor = '', onSubmit }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [color, setColor] = useState(initialColor);
  const theme = useTheme();

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setColor(initialColor);
  }, [initialTitle, initialDescription, initialColor]);

  const handlePress = () => {
    onSubmit(title, description, color);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Titulo da Tarefa"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        label="Cor"
        value={color}
        onChangeText={setColor}
        style={styles.input}
      />
      <Button mode="contained" onPress={handlePress} style={styles.button}>
        Salvar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default TaskForm;