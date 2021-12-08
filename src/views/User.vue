<template>
  <div class="about">
    <h1>User Details</h1>
    <span v-if="isLoading">
      <img
        src="@/assets/spinner.gif"
        width="80"
        height="80"
        alt="Fetching result..."
      />
    </span>
    <div v-else>
      <div v-if="isValid">
        <UserDetails
          :id="data.id"
          :first_name="data.first_name"
          :avatar="data.avatar"
          :last_name="data.last_name"
          :email="data.email"
        />
      </div>
      <div v-else>
        <h3>User not found</h3>
        <router-link to="/" tag="button">Go to home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Users from "@/api/users";
import UserDetails from "@/components/UserDetails.vue";

export default {
  name: "User",
  data: function () {
    return {
      isValid: true,
      isLoading: true,
      data: {},
    };
  },
  components: {
    UserDetails,
  },
  mounted: async function () {
    const id = this.$route.query.id;
    if (id > 0) {
      try {
        const { data } = await Users.getUserById(id);
        if (!data) {
          this.isValid = false;
        } else {
          this.data = data;
        }
        this.isLoading = false;
      } catch (e) {
        console.error(e);
      }
    } else {
      this.isValid = false;
    }
  },
};
</script>
 