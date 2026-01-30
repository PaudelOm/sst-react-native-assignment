import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import type {AuthStackParamList} from "./types";

import LoginScreen from "../features/auth/screens/LoginScreen";
import SignupScreen from "../features/auth/screens/SignupScreen";
import ForgetPasswordScreen from "../features/auth/screens/ForgetPasswordScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
            <Stack.Screen
                name={"ForgotPassword"}
                component={ForgetPasswordScreen}
                options={{title: "Forgot Password"}}
            />
        </Stack.Navigator>
    );
}