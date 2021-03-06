<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

import { Edit, User, Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const users = ref([]);
const users_meta: any = ref({});
const page = ref(1);
const per_page = ref(10);

const router = useRouter();

const handleEdit = (idx: number, data: any) => {
  console.log(`${idx}  ${data.id}`);

  router.push(`/users/${data.id}/edit`);
};

const handleDelete = async (idx: number, data: any) => {
  console.log(`${idx}  ${data}`);
  await axios.delete(`users/${data.id}`);
  await loadUsers(page.value, per_page.value);
};

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  loadUsers(page.value, val);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  loadUsers(val, per_page.value);
};

const loadUsers = async (page: number, per_page: number) => {
  const { data } = await axios.get(`users?page=${page}&per_page=${per_page}`);
  users.value = data.data;
  users_meta.value = data.meta;
};

onMounted(async () => {
  await loadUsers(page.value, per_page.value);
});
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Users</span>
        <router-link to="/users/create"
          ><el-button
            size="small"
            type="success"
            :icon="User"
            circle
          ></el-button
        ></router-link>
      </div>
    </template>
    <div>
      <el-table border :data="users" style="width: 100%">
        <el-table-column label="Name" width="240">
          <template #default="scope">
            {{ scope.row.first_name }} {{ scope.row.last_name }}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="Email" width="240" />
        <el-table-column prop="role.name" label="Role" />

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

      <el-pagination
        style="margin-top: 20px"
        small
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50]"
        v-model:currentPage="page"
        v-model:page-size="per_page"
        :total="users_meta.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="mt-4"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<style></style>
