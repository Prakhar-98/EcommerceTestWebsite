export class User
{   
    userId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    userPassword: string;
    userRole: string;
    isActive:string;
    constructor(id?,name?,email?,password?,mobile?,role?)
    {   
        this.userId=id;
        this.userName=name;
        this.userEmail=email;
        this.userPassword=password;
        this.userPhone=mobile;
        this.userRole=role;
    }
    
}