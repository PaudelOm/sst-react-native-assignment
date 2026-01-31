import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../../navigation/types";
import {ActivityIndicator, Button, Text, TextInput, View} from "react-native";
import React from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useSignupMutation} from "../authApi";
import {Controller, useForm} from "react-hook-form";
import {setCredentials} from "../authSlice";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignupScreen: React.FC<Props> = ({navigation}: Props) => {
    const dispatch = useAppDispatch();
    const [signup, { isLoading, error }] = useSignupMutation();

    const {
        control,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const onSubmit = async (values: FormValues) => {
        try {
            const result = await signup({
                name: values.name.trim(),
                email: values.email.trim().toLowerCase(),
                password: values.password,
            }).unwrap();


            dispatch(setCredentials(result));
        } catch (e) {
            console.log("SIGNUP unwrap error:", e);
        }
    };

    const apiMessage =
        error && "data" in error
            ? (error as any).data?.message ?? "Signup failed"
            : error
                ? "Signup failed"
                : "";
    console.log("SIGNUP hook error:", error);


    return (
        <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "600", textAlign: "center" }}>
                Signup
            </Text>

            <Text>Name</Text>
            <Controller
                control={control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Your name"
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
            {!!errors.name?.message && <Text style={{ color: "red" }}>{errors.name.message}</Text>}

            <Text>Email</Text>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
                }}
                render={({ field: { onChange, value } }) => (
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
            {!!errors.email?.message && <Text style={{ color: "red" }}>{errors.email.message}</Text>}

            <Text>Password</Text>
            <Controller
                control={control}
                name="password"
                rules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                        placeholder="Password"
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
            {!!errors.password?.message && (
                <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}

            <Text>Confirm Password</Text>
            <Controller
                control={control}
                name="confirmPassword"
                rules={{
                    required: "Confirm your password",
                    validate: (v) => v === password || "Passwords do not match",
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                        placeholder="Confirm password"
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
            {!!errors.confirmPassword?.message && (
                <Text style={{ color: "red" }}>{errors.confirmPassword.message}</Text>
            )}

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Button title="Create account" onPress={handleSubmit(onSubmit)} />
            )}

            {!!apiMessage && <Text style={{ color: "red", textAlign: "center" }}>{apiMessage}</Text>}

            <Button title="Back to Login" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default SignupScreen;