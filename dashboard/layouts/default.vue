<script setup lang="ts"></script>
<template>
  <w-layout>
    <w-drawer layout width="[300px]" class="bg-white">
      <div>Drawer</div>
    </w-drawer>

    <w-content layout class="bg-slate-200 p-10">
      <slot />
    </w-content>
  </w-layout>
</template>
