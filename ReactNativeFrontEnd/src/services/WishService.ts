export class WishService {
  FetchWishes = async () => {
    try {
      const response = await fetch('http://192.168.0.99:5001/wish');
      const data = await response.json();

      const transformedWishes: Wish[] = data.$values.map((wish: any) => ({
            title: wish.title,
            description: wish.description,
            user: wish.user
        }));
        console.log("Fetch from WishService :", JSON.stringify(transformedWishes, null, 2))
        return transformedWishes;
    } 
    catch (error) {
      console.log("Handled Error: ", error);
    } 
  };
  CreateWish = async (wish: Wish) => {
    try {
      const response = await fetch('http://192.168.0.99:5001/wish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wish)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create wish');
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

