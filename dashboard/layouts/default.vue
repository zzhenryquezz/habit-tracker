<script setup lang="ts"></script>
<template>
  <w-layout>
    <h-drawer></h-drawer>

    <w-content layout class="bg-slate-200 p-10">
      <slot />
    </w-content>
  </w-layout>
</template>
