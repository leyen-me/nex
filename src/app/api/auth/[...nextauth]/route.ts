import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import type { AuthOptions } from "next-auth"
import { LOGIN_URL } from "@/constans"
import { LOGIN_ERROR_URL } from "@/constans"

const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',

            // The credentials is used to generate a suitable form on the sign in page.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },

            /**
             * Verify user credentials
             * 验证用户凭证
             */
            async authorize(credentials, req) {
                try {
                    if (credentials?.username) {
                        return {
                            id: "1",
                            name: "admin",
                            email: "admin@admin.com",
                        }
                    }
                    // Return null if user data could not be retrieved
                    return null;
                } catch (error) {
                    // If you throw, the user will be sent to the error page with the error message as a query parameter
                    throw new Error("Authentication failed");
                }
            }
        })
    ],
    pages: {
        signIn: LOGIN_URL,
        error: LOGIN_ERROR_URL,
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        /**
        * Callback after successful sign in
        * 登录成功后的回调
        */
        async session({ session, token, user }) {
            return session
        },

        /**
         * Callback after token is created
         * 创建令牌后的回调
         */
        async jwt({ token, user, account, profile }) {
            return token
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }