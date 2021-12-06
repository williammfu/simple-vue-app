<template>
  <div class="hello">
    <h2>My Simple Dashboard</h2>
    <div class="taskbar">
      <div>
        <label for="colname">Sort by </label>
        <select v-model="colname" id="colname">
          <option>ID</option>
          <option>Email</option>
          <option>First Name</option>
          <option>Last Name</option>
        </select>
      </div>
      <div>
        <input type="radio" id="asc" value="asc" v-model="sort" />
        <label for="asc">Asc</label>
        <input type="radio" id="desc" value="desc" v-model="sort" />
        <label for="desc">Desc</label>
      </div>
      <div>
        <label for="rows">Rows </label>
        <select v-model="rows" id="rows">
          <option>3</option>
          <option>5</option>
          <option>All</option>
        </select>
      </div>
    </div>
    <table class="globalTable">
      <thead>
        <tr>
          <th>ID</th>
          <th></th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in displayData" :key="idx">
          <td>{{ user.id }}</td>
          <td>
            <button type="button">See details</button>
            <button type="button">Delete</button>
            <button type="button">Update</button>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Users from "../api/users.js";

export default {
  name: "MainTable",
  data: function () {
    return { users: {}, sort: "asc", colname: "ID", rows: "5" };
  },
  computed: {
    displayData: function () {
      if (this.users.data) {
        let temp = [...this.users.data];
        temp.sort((a, b) => {
          let parsedColName = this.colname.toLowerCase().replace(" ", "_");
          if (a[parsedColName] < b[parsedColName]) {
            return -1;
          } else if (a[parsedColName] > b[parsedColName]) {
            return 1;
          } else {
            return 0;
          }
        });
        if (this.sort === "desc") temp.reverse();
        if (this.rows === "All") {
          return temp;
        } else {
          return temp.slice(0, parseInt(this.rows));
        }
      } else {
        return [];
      }
    },
  },
  methods: {
    async getUserPerPage(page) {
      try {
        this.users = await Users.getUsersList(page);
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted: async function () {
    await this.getUserPerPage(1);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 1rem auto;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
td {
  padding: 0.5rem;
}
.globalTable {
  width: 85%;
  margin: 1rem auto;
  border: 1px solid silver;
  border-radius: 5px;
  text-align: center;
  padding: 0.5rem;
}
.taskbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
  width: 85%;
  margin: 0.5rem auto;
}
</style>
