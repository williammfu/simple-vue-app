<template>
  <div class="hello">
    <Modal
      v-if="showModal"
      :question="question"
      :mode="mode"
      :id="id"
      @on-close="closeModal"
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
    <Calculator />
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Calculator from "@/components/Calculator.vue";

export default {
  name: "MainTable",
  components: {
    Modal,
    Calculator,
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
      mode: 0,
      id: 0,
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
    closeModal(id = -1, updated_at = "") {
      if (id !== -1 && !updated_at) {
        this.users = [...this.users].map((user) => {
          if (user.id === id) {
            return { ...user, updated_at: updated_at };
          } else {
            return { ...user };
          }
        });
        this.updated[id - 1] = true;
        this.$store.dispatch("update", { users: this.users });
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
  border-radius: 5px;
  box-shadow: 2px 4px 15px rgb(0, 0, 0, 0.15);
  text-align: center;
  padding: 0.5rem;
  overflow-x: auto;
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
  color: darkturquoise;
  font-weight: 600;
}
</style>
