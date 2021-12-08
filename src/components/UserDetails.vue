<template>
  <div class="cardWrapper">
    <div class="content">
      <img :src="avatar" width="120" height="120" class="avatar" />
      <div class="cardDetails">
        <h2>{{ first_name }}</h2>
        <span>{{ `Full name: ${first_name} ${last_name}` }}</span>
        <span>{{ `Email: ${email}` }}</span>
        <span>{{ `Employee ID: ${id}` }}</span>
      </div>
    </div>
    <div class="buttonWrapper">
      <router-link to="/" tag="button">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDetails",
  props: {
    id: Number,
    avatar: String,
    first_name: String,
    last_name: String,
    email: String,
  },
};
</script>

<style scoped>
h2 {
  margin: 0.25rem 0;
}
.cardWrapper {
  border-radius: 5px;
  box-shadow: 2px 4px 15px rgb(0, 0, 0, 0.2);
  margin: auto;
  width: 560px;
  padding: 1rem;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
.cardDetails {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.avatar {
  border-radius: 2px;
}
.buttonWrapper {
  margin-top: 1rem;
}
</style>