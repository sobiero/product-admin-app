<script setup lang="ts">
import type { Role } from "@/models/role";
import axios from "axios";
import { ElNotification } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  role_id: "",
});

const roles = ref([] as Role[]);

const errorMsg = ref("");

const { push } = useRouter();

const { params } = useRoute();

const showError = () => {
  ElNotification({
    title: "Error",
    message: errorMsg.value,
    duration: 0,
    type: "error",
  });
};

onMounted(async () => {
  const rolesRes = await axios.get("roles");
  roles.value = rolesRes.data;

  const userRes = await axios.get(`users/${params.id}`);

  form.email = userRes.data.email;
  form.first_name = userRes.data.first_name;
  form.last_name = userRes.data.last_name;
  form.role_id = userRes.data.role?.id;
});

const onSubmit = async () => {
  //console.log(form)

  try {
    const res = await axios.put(`users/${params.id}`, form);

    console.log(res.status);

    if (res.status === 202) {
      await push("/users");
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
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Add User</span>
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

        <el-form-item label="Role">
          <el-select
            v-model="form.role_id"
            class="m-2"
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">Update</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style></style>
