import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AppStackParamList} from "../../../navigation/types";
import {Button, Text, View} from "react-native";
import React from "react";

type Props = NativeStackScreenProps<AppStackParamList, "EditProfile">;

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Edit Profile</Text>

            <Button title="Save (dummy)" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default EditProfileScreen;