<script setup lang="ts">
//import type { Permission } from "@/models/permission";
import axios from "axios";
import { ElNotification } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const form = reactive({
  name: "",
  permissions: [],
});

const checkAll = ref(false);
const isIndeterminate = ref(true);
//const checkedPermissions = ref([])
const permissions: any = ref([]);

//const permissions_val = [1, 2, 3, 4, 5, 6, 7, 8];

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

const router = useRouter();

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
});

const onSubmit = async () => {
  //console.log(form)

  try {
    const res = await axios.post("roles", form);

    console.log(res.status);

    if (res.status === 201) {
      await router.push("/roles");
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
        <span>Add Role</span>
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
          <el-button type="primary" native-type="submit">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style></style>
