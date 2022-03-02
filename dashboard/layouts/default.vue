<template>
  <w-layout>
    <w-toolbar layout color="red-500"> Toolbar </w-toolbar>

    <w-drawer layout class="bg-blue-500">
      <div>{{ 'drawer \n'.repeat(1000) }}</div>
    </w-drawer>

    <w-content layout class="bg-green-500">
      <pre>{{ 'content \n'.repeat(10000) }}</pre>
    </w-content>
  </w-layout>
</template>
