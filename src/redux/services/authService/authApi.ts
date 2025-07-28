import { baseApi } from "@/redux/baseApi/baseApi";

// Auth interfaces
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint using fakestoreapi
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users"],
      transformResponse: (response: any) => {
        // Store token in localStorage after successful login
        if (response.token) {
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
      },
    }),

    // Get current user profile (mock endpoint)
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/users/1", // Mock user endpoint
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
      providesTags: ["Users"],
      transformResponse: (response: any) => {
        return {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.name?.firstname || "John",
          lastName: response.name?.lastname || "Doe",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
