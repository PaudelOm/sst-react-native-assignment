import {baseApi} from "../../services/baseApi";
import type {User} from "../auth/authApi";


export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<User, string>({
            query: (userId) => `users/${userId}`,
            providesTags: (result, error, userId) => [{type: "Profile", id: userId}],
        }),

        updateProfile: builder.mutation<User, { userId: string; name: string; email: string }>({
            query: ({userId, name, email}) => ({
                url: `users/${userId}`,
                method: "PUT",
                body: {name, email},
            }),
            invalidatesTags: (result, error, {userId}) => [{type: "Profile", id: userId}],
        }),
    }),
    overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;