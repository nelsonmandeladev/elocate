import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Resend from "next-auth/providers/resend"


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Facebook,
        Resend({
            from: "no-reply@elocate.nelsonmandeladev.dev",
        }),
    ],
    pages: {
        signIn: "/login",
        newUser: "/register-success",
        verifyRequest: "/confirm-account",
        error: "/error"
    }

})