<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

const form = reactive({
  email: "",
  password: "",
});

const errorMsg = ref("");

const router = useRouter();

const showError = () => {
  ElNotification({
    title: "Error",
    message: errorMsg.value,
    duration: 5000,
    type: "error",
  });
};

const onSubmit = async () => {
  try {
    const res = await axios.post("login", form);
    if (res.status === 200) {
      await router.push("/");
    }
  } catch (error: any) {
    //console.log(error.response.data);

    //showErrorMsg.value = true;
    errorMsg.value = error.response.data;
    showError();
  }
};
</script>

<template>
  <el-card class="box-card" style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>Login</span>
      </div>
    </template>
    <div>
      <el-form
        ref="formRef"
        :model="form"
        @submit.prevent="onSubmit"
        label-width="120px"
      >
        <el-form-item label="Email">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style></style>
