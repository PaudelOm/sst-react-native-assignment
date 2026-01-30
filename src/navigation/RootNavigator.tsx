import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useState} from "react";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

type RootStackParamList = {
    Auth: undefined;
    App: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    const [isLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {isLoggedIn ? (
                    <RootStack.Screen name="App" component={AppStack} />
                ): (
                    <RootStack.Screen name="Auth" component={AuthStack} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}