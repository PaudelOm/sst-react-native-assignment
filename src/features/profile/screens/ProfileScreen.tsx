import React from "react";
import {View, Text, Button, ActivityIndicator} from "react-native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {AppStackParamList} from "../../../navigation/types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logout} from "../../auth/authSlice";
import {useGetProfileQuery} from "../profileApi";

type Props = NativeStackScreenProps<AppStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const authUser = useAppSelector((state) => state.auth.user)
    const userId = authUser?.id ?? "";
    const { data, isLoading, isError, refetch } = useGetProfileQuery(userId, {
        skip: !userId,
    });
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "600", textAlign: "center" }}>
                Profile
            </Text>

            {!userId ? (
                <Text style={{ textAlign: "center" }}>No user logged in.</Text>
            ) : isLoading ? (
                <ActivityIndicator />
            ) : isError ? (
                <>
                    <Text style={{ color: "red", textAlign: "center" }}>
                        Failed to load profile.
                    </Text>
                    <Button title="Retry" onPress={() => refetch()} />
                </>
            ) : (
                <>
                    <Text style={{ fontSize: 16 }}>
                        <Text style={{ fontWeight: "600" }}>Name: </Text>
                        {data?.name ?? "-"}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        <Text style={{ fontWeight: "600" }}>Email: </Text>
                        {data?.email ?? "-"}
                    </Text>

                    <Button title="Edit Profile" onPress={() => navigation.navigate("EditProfile")} />
                    <Button title="Go to Todos" onPress={() => navigation.navigate("Todos")} />
                    <Button title="Logout" onPress={handleLogout} />
                </>
            )}
        </View>
    );
};

export default ProfileScreen;