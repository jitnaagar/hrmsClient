import NextAuth, { AuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    session : {
        strategy : 'jwt'
    },
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            type : 'credentials',
            credentials : {},
            async authorize(credentials, req){
                return {
                    token : credentials.token,
                }
            }
        })
    ],
    callbacks : {
        jwt : ({token, user}) => {
            if(token && token.expires && token.expires < Date.now()){
                delete token.expires
            }
            return { ...token, ...user}
        },
        session : ({ session, token, user}) =>  {
            session.user = token;
            return session;
        }
    }
}

const handler = NextAuth (authOptions)

export { handler as GET, handler as POST, authOptions}
