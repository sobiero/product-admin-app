<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

import { Edit, Plus, Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

const roles = ref([]);
// const users_meta: any = ref({});
// const page = ref(1);
// const per_page = ref(10);

const router = useRouter();

const errorMsg = ref("");
const showError = () => {
  ElNotification({
    title: "Error",
    message: errorMsg.value,
    duration: 0,
    type: "error",
  });
};

const handleEdit = (idx: number, data: any) => {
  console.log(`${idx}  ${data.id}`);

  router.push(`/roles/${data.id}/edit`);
};

const handleDelete = async (idx: number, data: any) => {
  try {
    console.log(`${idx}  ${data}`);
    await axios.delete(`roles/${data.id}`);
    await loadRoles();
  } catch (error: any) {
    //console.log(error.response.data);
    //showErrorMsg.value = true;
    errorMsg.value = error.response.data;
    showError();
  }
};

// const handleSizeChange = (val: number) => {
//   console.log(`${val} items per page`);
//   //loadUsers(page.value, val);
// };
// const handleCurrentChange = (val: number) => {
//   console.log(`current page: ${val}`);

// };

const loadRoles = async () => {
  const { data } = await axios.get(`roles`);
  roles.value = data;
  //users_meta.value = data.meta;
};

onMounted(async () => {
  await loadRoles();
});
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Roles</span>
        <router-link to="/roles/create"
          ><el-button
            size="small"
            type="success"
            :icon="Plus"
            circle
          ></el-button
        ></router-link>
      </div>
    </template>
    <div>
      <el-table border :data="roles" style="width: 100%">
        <el-table-column label="Name" width="240">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="Actions">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              :icon="Edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>

            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              confirm-button-type="danger"
              cancel-button-type="success"
              :title="
                'Are you sure to delete ' +
                scope.row.first_name +
                ' ' +
                scope.row.last_name +
                '?'
              "
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  circle
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<style></style>
