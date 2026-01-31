import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AppStackParamList} from "../../../navigation/types";
import {ActivityIndicator, Button, Text, TextInput, View} from "react-native";
import React, {useEffect} from "react";
import {useAppSelector} from "../../../app/hooks";
import {useGetProfileQuery, useUpdateProfileMutation} from "../profileApi";
import {Controller, useForm} from "react-hook-form";

type Props = NativeStackScreenProps<AppStackParamList, "EditProfile">;

type FormValues = {
    name: string,
    email: string,
}

const EditProfileScreen: React.FC<Props> = ({navigation}) => {
    const authUser = useAppSelector((state) => state.auth.user);
    const userId = authUser?.id ?? "";

    const {data, isLoading: isProfileLoading, isError} = useGetProfileQuery(userId, {
        skip: !userId,
    });

    const [updateProfile, {isLoading: isSaving, error: saveError}] =
        useUpdateProfileMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {name: "", email: ""},
    });

    useEffect(() => {
        if (data) {
            reset({
                name: data.name ?? "",
                email: data.email ?? "",
            });
        }
    }, [data, reset]);

    const onSubmit = async (values: FormValues) => {
        if (!userId) return;

        try {
            await updateProfile({
                userId,
                name: values.name.trim(),
                email: values.email.trim().toLowerCase(),
            }).unwrap();

            navigation.goBack();
        } catch (e) {
        }
    };

    const saveMessage =
        saveError && "data" in saveError
            ? (saveError as any).data?.message ?? "Update failed"
            : saveError
                ? "Update failed"
                : "";

    if (!userId) {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>No user logged in.</Text>
                <Button title="Back" onPress={() => navigation.goBack()}/>
            </View>
        );
    }

    if (isProfileLoading) {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator/>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", gap: 12}}>
                <Text style={{color: "red"}}>Failed to load profile.</Text>
                <Button title="Back" onPress={() => navigation.goBack()}/>
            </View>
        );
    }

    return (
        <View style={{flex: 1, padding: 16, justifyContent: "center", gap: 10}}>
            <Text style={{fontSize: 22, fontWeight: "600", textAlign: "center"}}>
                Edit Profile
            </Text>

            <Text>Name</Text>
            <Controller
                control={control}
                name="name"
                rules={{required: "Name is required"}}
                render={({field: {onChange, value}}) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Name"
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                        }}
                    />
                )}
            />
            {!!errors.name?.message && <Text style={{color: "red"}}>{errors.name.message}</Text>}

            <Text>Email</Text>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: "Email is required",
                    pattern: {value: /\S+@\S+\.\S+/, message: "Enter a valid email"},
                }}
                render={({field: {onChange, value}}) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="you@example.com"
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                        }}
                    />
                )}
            />
            {!!errors.email?.message && <Text style={{color: "red"}}>{errors.email.message}</Text>}

            {isSaving ? (
                <ActivityIndicator/>
            ) : (
                <Button title="Save" onPress={handleSubmit(onSubmit)}/>
            )}

            {!!saveMessage && <Text style={{color: "red", textAlign: "center"}}>{saveMessage}</Text>}

            <Button title="Cancel" onPress={() => navigation.goBack()}/>
        </View>
    );
};

export default EditProfileScreen;