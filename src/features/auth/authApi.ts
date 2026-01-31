import {baseApi} from "../../services/baseApi";

export type LoginRequest = {
    email: string;
    password: string;
};

export type SignupRequest = {
    name: string;
    email: string;
    password: string;
};

export type User = {
    id: string;
    name?: string;
    email: string;
    password?: string;
};

export type ForgotPasswordRequest = {
    email: string;
};


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        forgotPassword: builder.mutation<{ ok: true; message: string}, ForgotPasswordRequest>({
            async queryFn(arg, _api, _extraOptions, baseQuery){
                const {email} = arg;

                const res = await baseQuery({
                    url: `users?email=${encodeURIComponent(email)}`,
                    method: "GET",
                });

                if (res.error) return { error: res.error};

                const users = res.data as User[];
                const user = users?.[0];

                if (!user) {
                    return {
                        error: { status: 404,  data: { message: "Email not found" }  }
                    };
                }
                return {
                    data: { ok: true, message: "Password reset link sent (mock)." },
                };
            }
        }),

        login: builder.mutation<{ user: User; token: string }, LoginRequest>({
            async queryFn(arg, _api, _extraOptions, baseQuery) {
                const {email, password} = arg;

                const result = await baseQuery({
                    url: `users?email=${encodeURIComponent(email)}`,
                    method: "GET",
                });

                if (result.error) return {error: result.error};

                const users = result.data as User[];
                const user = users?.[0];

                if (!user) {
                    return {
                        error: {status: 401, data: {message: "User not found"}},
                    };
                }

                if (user.password !== password) {
                    return {
                        error: {status: 401, data: {message: "Invalid email or password"}},
                    };
                }

                return {data: {user, token: `mock-token-${user.id}`},};
            },
        }),

        signup: builder.mutation<{ user: User; token: string }, SignupRequest>({
            query: ({ name, email, password }) => ({
                url: "users",
                method: "POST",
                body: { name, email, password },
            }),
            transformResponse: (user: User) => {
                return {
                    user,
                    token: `mock-token-${user.id}`,
                };
            },
        })
    }),
    overrideExisting: false,
});

export const { useForgotPasswordMutation, useLoginMutation, useSignupMutation  } = authApi;
