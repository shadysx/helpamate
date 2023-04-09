export class UserService {
    FetchUsers = async () => {
        try {
          const response = await fetch('http://192.168.0.99:5001/User');
          const data = await response.json();

          const transformedUsers: User[] = data.$values.map((user: any) => ({
              username: user.username,
              avatarUrl: user.avatarUrl,
              wishes: user.wishes.$values
            }));
            console.log("Fetch from UserService :", JSON.stringify(transformedUsers, null, 2))
            return transformedUsers;
        } catch (error) {
          console.log("Handled Error: ", error);
        }
      };
}

