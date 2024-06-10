import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SQLite from "react-native-sqlite-storage";

// Abrir ou criar o banco de dados
const db = SQLite.openDatabase(
  {
    name: "tarefas.db",
    location: "default",
  },
  () => {},
  error => {
    console.log(error);
  }
);

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    criarTabela();
    carregarTarefas();
  }, []);

  const criarTabela = () => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT);",
        [],
        () => { console.log('Tabela criada com sucesso') },
        error => { console.log(error) }
      );
    });
  };

  const carregarTarefas = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM tarefas;",
        [],
        (tx, results) => {
          const rows = results.rows;
          let tarefas = [];

          for (let i = 0; i < rows.length; i++) {
            tarefas.push({
              ...rows.item(i),
            });
          }

          setTarefas(tarefas);
        }
      );
    });
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO tarefas (titulo) VALUES (?);",
        [novaTarefa],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            carregarTarefas();
            setNovaTarefa('');
          }
        }
      );
    });
  };

  const removerTarefa = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM tarefas WHERE id = ?;",
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            carregarTarefas();
          }
        }
      );
    });
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.corpo}>
        <FlatList
          style={estilos.lista}
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={estilos.itemContainer}>
              <Text style={estilos.item}>{item.titulo}</Text>
              <TouchableOpacity onPress={() => removerTarefa(item.id)}>
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
