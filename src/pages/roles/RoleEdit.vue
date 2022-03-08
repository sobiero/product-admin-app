<script setup lang="ts">
import type { Permission } from "@/models/permission";
import axios from "axios";
import { ElNotification } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const form = reactive({
  name: "",
  permissions: [],
});

const { push } = useRouter();
const { params } = useRoute();

const checkAll = ref(false);
const isIndeterminate = ref(true);
//const checkedPermissions = ref([])
const permissions: any = ref([]);

const handleCheckAllChange = (val: boolean) => {
  form.permissions = val ? permissions.value.id : [];
  isIndeterminate.value = false;
};
const handleCheckedPermissionsChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === permissions.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < permissions.value.length;
};

const errorMsg = ref("");

const showError = () => {
  ElNotification({
    title: "Error",
    message: errorMsg.value,
    duration: 0,
    type: "error",
  });
};

onMounted(async () => {
  const { data } = await axios.get("permissions");
  permissions.value = data;

  const roleRes = await axios.get(`roles/${params.id}`);
  form.name = roleRes.data.name;
  form.permissions = roleRes.data.permissions?.map((a: Permission) => a.id);
});

const onSubmit = async () => {
  //console.log(form)

  try {
    const res = await axios.put(`roles/${params.id}`, form);

    console.log(res.status);

    if (res.status === 202) {
      await push("/roles");
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
        <span>Edit Role</span>
      </div>
    </template>
    <div>
      <el-form
        ref="formRef"
        :model="form"
        @submit.prevent="onSubmit"
        label-width="120px"
      >
        <el-form-item label="Role Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-checkbox
          style="display: none"
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >Check all</el-checkbox
        >
        <el-checkbox-group
          v-model="form.permissions"
          @change="handleCheckedPermissionsChange"
        >
          <el-checkbox
            v-for="perm in permissions"
            :key="perm.id"
            :label="perm.id"
            >{{ perm.name }}</el-checkbox
          >
        </el-checkbox-group>

        <el-form-item>
          <el-button type="primary" native-type="submit">Update</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style></style>
