import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import type {AppStackParamList} from "./types";
import LoginScreen from "../features/auth/screens/LoginScreen";
import ProfileScreen from "../features/profile/screens/ProfileScreen";
import EditProfileScreen from "../features/profile/screens/EditProfileScreen";
import TodosScreen from "../features/profile/screens/TodosScreen";
const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
                name={"EditProfile"}
                component={EditProfileScreen}
                options={{title: "Edit Prefile"}}
            />
            <Stack.Screen name="Todos" component={TodosScreen} />
        </Stack.Navigator>
    );
}