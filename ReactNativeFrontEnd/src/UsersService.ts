class UsersService {
    getUsers = async () =>  {
        try {
            const users = await fetch("https://localhost:7249/user");
            return users;
        }
        catch (error) {
            console.log(error)
        }
    } 
}