import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthServices 
{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async CreateAccount ({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                
            }
            else{
                return userAccount
            }
        }
        catch(error){
            throw error;
        }
    }

    async login ({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authServices = new AuthServices();
export default authServices;