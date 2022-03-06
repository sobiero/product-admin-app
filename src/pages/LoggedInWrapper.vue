<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import NavMenu from "@/components/NavMenu.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";

const user_name = ref("");

onMounted(async () => {
  try {
    const { data } = await axios.get("user");

    user_name.value = data.first_name + " " + data.last_name;
  } catch (error) {
    router.push("/login");
  }
});

const logout = async () => {
  await axios.post("logout");
};
</script>

<template>
  <el-container>
    <NavMenu />

    <el-container>
      <el-header>
        <RouterLink to="/profile">{{ user_name }}</RouterLink> &nbsp;

        <RouterLink to="/login" @click="logout">Signout</RouterLink>
      </el-header>
      <el-main> <RouterView /> </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
