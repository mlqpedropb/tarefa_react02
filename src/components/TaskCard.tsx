import React from 'react';
import { Card, IconButton, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface TaskCardProps {
  title: string;
  color: string;
  onEdit: () => void;
  onPress: () => void;
  onLongPress: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, color, onEdit, onPress, onLongPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
      <Card style={[styles.card, { borderLeftColor: color }]}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <IconButton icon="pencil" size={20} onPress={onEdit} />
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderLeftWidth: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default TaskCard;