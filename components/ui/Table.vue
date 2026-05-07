<template>
  <div class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
    <table class="min-w-full divide-y divide-slate-300">
      <thead class="bg-slate-50">
        <tr>
          <slot name="header"></slot>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 bg-white">
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>
