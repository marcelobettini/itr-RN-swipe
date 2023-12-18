import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { data } from "./tasks/data.js";
import Task from "./components/Task.jsx";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState(data);
  const handleDelete = id => {
    const remainingTasks = tasks.filter(t => t.id !== id);
    setTasks(remainingTasks);
  };

  const handleChangeStatus = id => {
    const modifiedTasks = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(() => [...modifiedTasks]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {tasks?.map(t => (
          <Task
            key={t.id}
            {...t}
            onDelete={id => handleDelete(id)}
            onChangeStatus={id => handleChangeStatus(id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
