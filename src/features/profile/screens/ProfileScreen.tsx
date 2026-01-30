import React from "react";
import { View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../../navigation/types";

type Props = NativeStackScreenProps<AppStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Profile</Text>

            <Button title="Edit Profile" onPress={() => navigation.navigate("EditProfile")} />
            <Button title="Go to Todos" onPress={() => navigation.navigate("Todos")} />
        </View>
    );
};

export default ProfileScreen;
