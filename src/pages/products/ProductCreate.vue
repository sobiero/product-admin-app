<script setup lang="ts">
//import type { Role } from "@/models/role";
import axios from "axios";
import { ElNotification } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const form = reactive({
  title: "",
  description: "",
  image: "",
  price: 0,
});

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

//onMounted(async () => {});

const upload = ref();
const fileList = ref([]);

const handleExceed = async (files: any) => {
  upload.value.clearFiles();
  upload.value.handleStart(files[0]);
};

const submitUpload = async () => {
  const formData = new FormData();

  const imagefile: any = document.querySelector('input[name="image"]');

  formData.append("image", imagefile.files[0]);

  const { data } = await axios.post("upload", formData);

  form.image = data.url;
};

const onSubmit = async () => {
  //console.log(form)

  try {
    const res = await axios.post("products", form);

    console.log(res.status);

    if (res.status === 201) {
      await router.push("/products");
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
  {{ fileList }}
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Add Product</span>
      </div>
    </template>
    <div>
      <el-form
        ref="formRef"
        :model="form"
        @submit.prevent="onSubmit"
        label-width="120px"
      >
        <el-form-item label="Title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="Description">
          <el-input
            v-model="form.description"
            :rows="2"
            type="textarea"
          ></el-input>
        </el-form-item>

        <el-form-item label="Image">
          <el-input v-model="form.image"></el-input>
        </el-form-item>

        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://192.168.110.110:8000/api/upload"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          name="image"
          :file-list="fileList"
        >
          <template #trigger>
            <el-button type="primary">select file</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload"
            >upload to server</el-button
          >
          <template #tip>
            <div class="el-upload__tip" style="color: red">
              limit 1 file, new file will replace the old file
            </div>
          </template>
        </el-upload>

        <el-form-item label="Price">
          <el-input-number v-model="form.price"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style></style>
