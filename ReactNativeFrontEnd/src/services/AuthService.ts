import { API } from "../config/constants";

export class AuthService {

    Register = async (user: UserRegisterDTO) => {  
      try {
        console.log(API + "/auth/register")
        const response = await fetch(API + "/auth/register", {
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

        console.log('Register response: ', data);

        return data;
      }
      catch (error){
        console.log('Handled Error When Register:', error);
      }
    }

    Login = async (user: UserLoginDTO) => {  
        try {
          console.log(API + "/auth/login")
          const response = await fetch(API + "/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
      
          if (!response.ok) {
            throw new Error('Failed to login user');
          }

        //   console.log(JSON.stringify(response, null, 2))
        const data = await response.json()
        console.log("data: ", data)
        }
        catch (error){
          console.log('Handled Error When Login:', error);
        }
      }
}
