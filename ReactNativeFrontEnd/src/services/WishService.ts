import { API } from "../config/constants";

export class WishService {

  route = "/Wishes"

  FetchWishes = async () => {
    try {
      const response = await fetch(API + this.route)
        .then(response => response.json())
      const data: Wish[] = response.data;
      console.log("Fetch from WishService:", JSON.stringify(data, null, 2))

      return data;
    } 
    catch (error) {
      console.log("Handled Error while fetching wishes: ", error);
    } 
  };

  FetchWishById = async (wishId: number) => {
    try {
      const response = await fetch(API + this.route + '/' + wishId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch wish');
      }
      
      const data = await response.json();

      console.log(data)
  
      return data;
    }
    catch (error){
      console.log('Handled Error when fetchin a wish by id:', error);
    }
  }

  CreateWish = async (wish: WishCreationDTO) => {
    console.log(API + this.route)
    console.log('sending in create service, ', JSON.stringify(wish, null, 2))
    try {
      const response = await fetch(API + this.route, {
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

      return data;
    }
    catch (error){
      console.log('Handled Error:', error);
    }
  }

  UpdateWish = async (wish: WishUpdateDTO) => {
    console.log(API + this.route + '/' + wish.id)
    try {
      const response = await fetch(API + this.route + '/' + wish.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wish)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update wish');
      }
      
      const data = await response.json();
  
      return data;
    }
    catch (error){
      console.log('Handled Error when updating a wish:', error);
    }
  }

  DeleteWish = async (wishId: number) => {
    console.log(API + this.route + '/' + wishId)
    try {
      const response = await fetch(API + this.route + '/' + wishId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete wish');
      }
      
      const data = await response.text();

      return data;
    }
    catch (error){
      console.log('Handled Error when deleting a wish:', error);
    }
  }
}


