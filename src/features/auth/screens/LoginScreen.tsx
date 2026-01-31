import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../../navigation/types";
import {ActivityIndicator, Button, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {setCredentials} from "../authSlice";
import {useLoginMutation} from "../authApi";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const [login, {isLoading, error}] = useLoginMutation();

    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("test@123");

    const onLogin = async () => {
        try {
            const result = await login({email, password}).unwrap();
            dispatch(setCredentials(result));
        } catch (e) {
            // error shown below
        }
    };

    const errorMessage =
        error && "data" in error
            ? // RTK Query sometimes returns structured errors
            JSON.stringify((error as any).data)
            : error
                ? "Login failed"
                : "";

    return (
        <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
            <Text style={{fontSize: 22, fontWeight: "600", textAlign: "center"}}>Login</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholder="Email"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                }}
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                }}
            />

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Button title="Login" onPress={onLogin} />
            )}

            {!!errorMessage && (
                <Text style={{ color: "red", textAlign: "center" }}>{errorMessage}</Text>
            )}

            <Button title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
            <Button
                title="Forgot Password"
                onPress={() => navigation.navigate("ForgotPassword")}
            />
        </View>
    );
}

export default LoginScreen;