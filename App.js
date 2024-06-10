import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [tarefas, setTarefas] = useState(['Limpar a cozinha', 'Lavar o carro', 'Buscar a marmita']);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;
    setTarefas([...tarefas, novaTarefa]);
    setNovaTarefa('');
  };

  const removerTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.corpo}>
        <FlatList
          style={estilos.lista}
          data={tarefas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={estilos.itemContainer}>
              <Text style={estilos.item}>{item}</Text>
              <TouchableOpacity onPress={() => removerTarefa(index)}>
                <Ionicons name="ios-close" size={25} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View>
        <Text style={estilos.titulo}>Lista de Tarefas</Text>
      </View>
      <View style={estilos.formulario}>
        <TextInput
          style={estilos.entrada}
          placeholderTextColor="#999"
          autoCorrect={false}
          placeholder="Adicione uma tarefa"
          maxLength={25}
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={estilos.botao} onPress={adicionarTarefa}>
          <Ionicons name="ios-add" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 50
  },
  corpo: {
    flex: 1
  },
  formulario: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: "#eee"
  },
  entrada: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  botao: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#a1c6cc",
    borderRadius: 4,
    marginLeft: 10
  },
  lista: {
    marginTop: 10
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  item: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
