import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../../navigation/types";

import { useForgotPasswordMutation } from "../authApi";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [localError, setLocalError] = useState("");
    const [forgotPassword, { isLoading, error }] =
        useForgotPasswordMutation();

    const onSubmit = async () => {
        setSuccessMessage("");

        const trimmed = email.trim().toLowerCase();

        // Basic validation
        if (!trimmed) {
            // show error without calling API
            return setLocalError("Email is required");
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(trimmed)) {
            return setLocalError("Enter a valid email");
        }

        setLocalError("");

        try {
            const result = await forgotPassword({ email: trimmed }).unwrap();
            setSuccessMessage(result.message);
        } catch (e) {
        }
    };


    const apiErrorMessage =
        error && "data" in error
            ? (error as any).data?.message ?? "Something went wrong"
            : error
                ? "Something went wrong"
                : "";

    return (
        <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "600", textAlign: "center" }}>
                Forgot Password
            </Text>

            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
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

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Button title="Send reset link" onPress={onSubmit} disabled={!email.trim()} />
            )}

            {!!apiErrorMessage && !localError && (
                <Text style={{ color: "red", textAlign: "center" }}>{apiErrorMessage}</Text>
            )}

            {!!successMessage && (
                <Text style={{ color: "green", textAlign: "center" }}>
                    {successMessage}
                </Text>
            )}

            <Button title="Back to Login" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default ForgotPasswordScreen;
