import axios from "axios";

export default class Users {
  static baseUrl = "https://reqres.in/api";
  static async getUsersList(pageNum) {
    try {
      const { data } = await axios.get(`${this.baseUrl}/users?page=${pageNum}`);
      if (data) {
        return data;
      } else {
        throw new Error("Empty response");
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async getUserById(id) {
    try {
      const { data } = await axios.get(`${this.baseUrl}/users/${id}`);
      if (data) {
        return data;
      } else {
        throw new Error("Empty response");
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async updateUser(id) {
    try {
      const { data } = await axios.put(`${this.baseUrl}/users/${id}`);
      if (data) {
        return data;
      } else {
        throw new Error("Empty response");
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteUser(id) {
    try {
      const { status } = await axios.delete(`${this.baseUrl}/users/${id}`);
      if (status === 204) {
        return true;
      } else {
        throw new Error("Empty response");
      }
    } catch (e) {
      console.error(e);
    }
  }

}
