import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../../navigation/types";
import {Button, Text, View} from "react-native";


type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">


export default function ForgetPasswordScreen({ navigation }: Props)  {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Forgot Password</Text>

            <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
    );
}