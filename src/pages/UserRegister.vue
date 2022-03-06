<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirm: "",
});

const errorMsg = ref("");

const showErrorMsg = ref(false);

const router = useRouter();

const showError = () => {
  ElNotification({
    title: "Error",
    message: errorMsg.value,
    duration: 0,
    type: "error",
  });
};

const onSubmit = async () => {
  try {
    const res = await axios.post("register", form);

    if (res.status === 200) {
      await router.push("/login");
    }
  } catch (error: any) {
    console.log(error.response.data);

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
        <span>Register</span>
      </div>
    </template>
    <div>
      <el-form
        ref="formRef"
        :model="form"
        @submit.prevent="onSubmit"
        label-width="120px"
      >
        <el-form-item label="First Name">
          <el-input v-model="form.first_name"></el-input>
        </el-form-item>

        <el-form-item label="Last Name">
          <el-input v-model="form.last_name"></el-input>
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="Password Confirm">
          <el-input v-model="form.password_confirm" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">Register</el-button>
        </el-form-item>
      </el-form>

      <el-alert
        ref="elAlert"
        v-if="showErrorMsg"
        title="Error"
        type="error"
        description="more text description"
        show-icon
      >
        {{ errorMsg }}
      </el-alert>
    </div>
  </el-card>
</template>

<style></style>
