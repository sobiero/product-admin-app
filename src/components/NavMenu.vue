<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" @click="handleIsCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group> -->

    <div style="text-align: right; margin-right: 10px; margin-bottom: 24px">
      <el-icon :size="50" class="expand-fold-icon" style="color: grey">
        <Expand v-if="isCollapse" @click="isCollapse = !isCollapse" />
        <Fold v-else @click="isCollapse = !isCollapse" />
      </el-icon>
    </div>

    <!-- <el-checkbox-group v-model="isCollapse">
    <el-checkbox label="Option A" />
    <el-checkbox label="Option B" />
    <el-checkbox label="Option C" />
    <el-checkbox label="disabled" disabled />
    <el-checkbox label="selected and disabled" disabled />
  </el-checkbox-group> -->

    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>

         


          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><Document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item> -->
      <el-menu-item index="5">
        <el-icon><House /></el-icon>
        <template #title> <RouterLink to="/">Home</RouterLink></template>
      </el-menu-item>
      <el-menu-item index="6">
        <el-icon><User /></el-icon>
        <template #title><RouterLink to="/users">Users</RouterLink></template>
      </el-menu-item>
      <el-menu-item index="7">
        <el-icon><InfoFilled /></el-icon>
        <template #title><RouterLink to="/about">About</RouterLink></template>
      </el-menu-item>
      <el-menu-item index="8">
        <el-icon><Plus /></el-icon>
        <template #title
          ><RouterLink to="/register">Register</RouterLink></template
        >
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
  House,
  Expand,
  Fold,
  User,
  Plus,
  InfoFilled,
  //Document,
  //Menu as IconMenu,
  //Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);

// const handleIsCollapse = () => {
//   isCollapse.value = !isCollapse.value;

//   //console.log( isCollapse.value ) ;
// };

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.expand-fold-icon:hover {
  cursor: pointer;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-popper a {
  color: white;
  text-decoration: none;
}
</style>
