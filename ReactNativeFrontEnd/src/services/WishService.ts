import { API } from "../config/constants";

export class WishService {

  route = "/Wishes"

  FetchWishes = async () => {
    console.log(API + "/Wishes")
    try {
      const response = await fetch(API + this.route);
      const data : Wish[] = await response.json();
      console.log("Fetch from WishService:", JSON.stringify(data, null, 2))

      return data;
    } 
    catch (error) {
      console.log("Handled Error while fetching wishes: ", error);
    } 
  };


  CreateWish = async (wish: WishCreationDTO) => {
    console.log(API + this.route)
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
      console.log(data)

      return data;
    }
    catch (error){
      console.log('Handled Error when deleting a wish:', error);
    }
  }
}


