import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../../navigation/types";
import {Button, Text, View} from "react-native";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props){
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Login</Text>

            <Button title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
            <Button
                title="Forgot Password"
                onPress={() => navigation.navigate("ForgotPassword")}
            />
        </View>
    )

}