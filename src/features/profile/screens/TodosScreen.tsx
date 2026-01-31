import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AppStackParamList} from "../../../navigation/types";
import {Button, FlatList, Pressable, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {set} from "react-hook-form";


type Props = NativeStackScreenProps<AppStackParamList, "Todos">;

type Todo = {
    id: string;
    title: string;
    done: boolean;
};

const TodosScreen: React.FC<Props> = () => {
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        const trimmed = title.trim();
        if (!trimmed) return;

        setTodos((prev) => [
            {id: String(Date.now()), title: trimmed, done: false},
            ...prev,
        ]);
        setTitle("");
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? {...t, done: !t.done} : t))
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <View style={{flex: 1, padding: 16, gap: 12}}>
            <Text style={{fontSize: 20, fontWeight: "600"}}>Todos (Local State Only)</Text>

            <View style={{flexDirection: "row", gap: 8}}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="New todo..."
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                    }}
                />
                <Button title="Add" onPress={addTodo}/>
            </View>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>No todos yet.</Text>}
                renderItem={({item}) => (
                    <View
                        style={{
                            padding: 12,
                            borderWidth: 1,
                            borderColor: "#eee",
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                        }}
                    >
                        <Pressable onPress={() => toggleTodo(item.id)} style={{flex: 1}}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    textDecorationLine: item.done ? "line-through" : "none",
                                }}
                            >
                                {item.title}
                            </Text>
                        </Pressable>

                        <Button title="Delete" onPress={() => deleteTodo(item.id)}/>
                    </View>
                )}
            />
        </View>
    )
}

export default TodosScreen;