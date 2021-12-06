import axios from "axios";

export default class Users {
  static baseUrl = "https://reqres.in/api";
  static async getUsersList(pageNum) {
    try {
      const { data } = await axios.get(`${this.baseUrl}/users?page=${pageNum}`);
      if (data) {
        return data
      } else {
        throw new Error('Empty response')
      }
    } catch (e) {
      console.error(e);
    }
  }
}
