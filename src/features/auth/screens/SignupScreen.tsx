import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../../navigation/types";
import {Button, Text, View} from "react-native";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;


export default function SignupScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Signup</Text>

            <Button title="Back to Login" onPress={() => navigation.goBack()} />
        </View>
    )
}