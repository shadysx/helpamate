import { API } from "../config/constants";

export class UserService {
    FetchUsers = async () => {
        try {
          const response = await fetch(API + "/user");
          const data = await response.json();

          const transformedUsers: User[] = data.$values.map((user: any) => ({
              id: user.id,
              email: user.email,
              avatarUrl: user.avatarUrl,
              wishes: user.wishes.$values
            }));
            console.log("Fetch from UserService :", JSON.stringify(transformedUsers, null, 2))
            return transformedUsers;
        } catch (error) {
          console.log("Handled Error: ", error);
        }
      };

    CreateUser = async (user: User) => {  
      try {
        const response = await fetch(API + "/user", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
    
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
        const data = await response.json();

        console.log('CreateUser response:', data);

        return data;
      }
      catch (error){
        console.log('Handled Error:', error);
      }
    }
}

