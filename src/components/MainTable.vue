<template>
  <div class="hello">
    <Modal
      v-if="showModal"
      :question="question"
      @on-reject="handleReject"
      @on-confirm="handleAccept"
    />
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
          <th>Updated At</th>
          <th></th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in displayData" :key="idx">
          <td>{{ user.id }}</td>
          <td :class="{ recent: updated[idx] }">{{ user.updated_at }}</td>
          <td>
            <router-link
              :to="{ path: 'user', query: { id: user.id } }"
              tag="button"
              >See details</router-link
            >
            <button
              type="button"
              @click="onClick(user.id, 'delete')"
              style="margin-left: 1rem"
            >
              Delete
            </button>
            <button
              type="button"
              @click="onClick(user.id, 'update')"
              style="margin-left: 1rem"
            >
              Update
            </button>
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
import Modal from "@/components/Modal.vue";

export default {
  name: "MainTable",
  components: {
    Modal,
  },
  data: function () {
    return {
      users: [],
      updated: [],
      sort: "asc",
      colname: "ID",
      rows: "All",
      currentCommand: "",
      deleteID: 0,
      updateID: 0,
      showModal: false,
      question: "",
    };
  },
  computed: {
    displayData: function () {
      if (this.users) {
        let temp = [...this.users];
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
    handleReject() {
      this.showModal = false;
    },
    async handleAccept() {
      if (this.currentCommand === "delete") {
        try {
          await Users.deleteUser(this.deleteID);
        } catch (e) {
          console.error(e);
        }
      } else if (this.currentCommand === "update") {
        try {
          const { updatedAt } = await Users.updateUser(this.updateID);
          this.users = [...this.users].map((e) => {
            if (e.id === this.updateID) {
              return { ...e, updated_at: updatedAt };
            } else {
              return e;
            }
          });
          this.updated[this.updateID - 1] = true;
          this.$store.dispatch("update", { users: this.users });
        } catch (e) {
          console.error(e);
        }
      }
      this.showModal = false;
    },
    onClick(id, command) {
      this.currentCommand = command;
      switch (command) {
        case "delete":
          this.deleteID = id;
          this.question = `Confirm delete employee of ID ${id}?`;
          break;
        case "update":
          this.updateID = id;
          this.question = `Confirm update employee of ID ${id}?`;
          break;
      }
      this.showModal = true;
    },
  },
  mounted: function () {
    this.users = this.$store.state.users;
    this.updated = this.users.map(() => false);
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
.recent {
  color: turquoise;
}
</style>
