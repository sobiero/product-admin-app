<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

import { Download } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import type { Product } from "@/models/product";

const orders = ref([]);
const orders_meta: any = ref({});
const page = ref(1);
const per_page = ref(10);

const router = useRouter();

/*
const handleEdit = (idx: number, data: Product) => {
  console.log(`${idx}  ${data.id}`);

  router.push(`/orders/${data.id}/edit`);
};

const handleDelete = async (idx: number, data: Product) => {
  console.log(`${idx}  ${data}`);
  await axios.delete(`orders/${data.id}`);
  await loadOrders(page.value, per_page.value);
};
*/

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  loadOrders(page.value, val);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  loadOrders(val, per_page.value);
};

const loadOrders = async (page: number, per_page: number) => {
  const { data } = await axios.get(`orders?page=${page}&per_page=${per_page}`);
  orders.value = data.data;
  orders_meta.value = data.meta;
};

const downloadCSV = async () => {
  const { data } = await axios.post(
    "orders/export",
    {},
    { responseType: "blob" }
  );
  const blob = new Blob([data], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "orders.csv";
  link.click();
};

onMounted(async () => {
  await loadOrders(page.value, per_page.value);
});
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Orders</span>

        <a href="#" @click="downloadCSV"
          ><el-button
            size="small"
            type="success"
            :icon="Download"
            circle
          ></el-button
        ></a>
      </div>
    </template>
    <div>
      <el-table border :data="orders" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-table border :data="props.row.order_items" style="width: 100%">
              <el-table-column
                prop="product_title"
                label="Product Title"
                width="240"
              />
              <el-table-column prop="quantity" label="Quantity" />
              <el-table-column prop="price" label="Price" />
            </el-table>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="Name" width="240" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="total" label="Total" />

        <el-table-column label="Actions">
          <!-- <template #default="scope">
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
                scope.row.title +
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
          </template> -->
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
        :total="orders_meta.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="mt-4"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<style></style>
