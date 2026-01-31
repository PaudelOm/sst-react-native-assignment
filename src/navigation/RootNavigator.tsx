import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useState} from "react";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import {useAppSelector} from "../app/hooks";

type RootStackParamList = {
    Auth: undefined;
    App: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

    const token = useAppSelector(state => state.auth.token);
    const isLoggedIn = Boolean(token);

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {isLoggedIn ? (
                    <RootStack.Screen name="App" component={AppStack}/>
                ) : (
                    <RootStack.Screen name="Auth" component={AuthStack}/>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}