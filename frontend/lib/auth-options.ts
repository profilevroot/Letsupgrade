import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";
import AzureADProvider from "next-auth/providers/azure-ad";
import { getRoutes } from "./utils";
import { get, post } from "@/hooks/useBackendApi";
import EmailProvider from "next-auth/providers/email";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    /* 
     EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    },
    from: process.env.EMAIL_FROM
  }),
   AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }), */
    CredentialProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('username and Password is required');
        }
        // Call your external API
        const {data,status} = await post("auth/login", {
          email: credentials.email,
          password: credentials.password,
        });
 
        // const existingUser = await res.json();

        /*    const existingUser = await db.users.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            roles:{
              select:{
                name:true,
                id:true
              }
            }
          }
        }); */
       // console.log(status,"====>", data);
        if (status === 400) {
          throw new Error(data?.error);
        }

        if (data?.error) {
          throw new Error(data?.error);
        } 

        if (data) {
          return data;
        }        
 
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Attach additional information to the JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.routes = user.routes;
        token.access_token = user.access_token;
        token.routesActions = user.routesActions;
      }
      return token;
    },
    async session({ session, token }) {
      // Include custom user data in the session
       //console.log("session=====", session, token);

      return {
        ...session,
        user: {
          ...session.user,
         ...token,
        },
      };
      //return session;
    },
  },

  /* callbacks: {
    async jwt({ token, user }) {
      console.log("jwt=====", token, user);
      /*  if (user) {
        return {
          ...token,
          username: user.username,
        };
      }  

      return { ...token, ...user };
    },
    async session({ session, token }) {
      //const response = await get("1", {});

     // const { routes, routesActions } = await response?.data?.data;
      //  const routes = getRoutes(user?.route_name);
      //session.user = token;
      const routes={}, routesActions={}
      console.log(token, "session=====", session, token);
      // console.log("tokenwwwwww=====", routes, routesActions);
      return {
        ...session,
        user: {
          ...session.user,
          routes,
          routesActions,
        },
      };
    },
  }, */
};
