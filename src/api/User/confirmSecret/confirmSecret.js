import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, generateToken } from "../../../utils";

export default{
    Mutation: {
        confirmSecret: async(_, args, { request }) => {
            console.log(request);
            const { email, secret } = args;
            const user = await prisma.user({ email });
            if(user.loginSecret === secret){
                await prisma.updateUser({
                    where: { id: user.id },
                    data: {
                        loginSecret: ""
                    }
                });
                return generateToken(user.id);
            }else{
                throw Error("이메일과 비밀키의 조합이 잘못되었습니다!");
            } 
        }
    }
}