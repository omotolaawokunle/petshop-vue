<template>
  <div class="home">
    <data-table :url="url" :columns="columns" :line-numbers="true">
      <template #item-products="props">
        {{ props.row.length }}
      </template>
      <template #item-created_at="props">
        {{ formatDate(props.row) }}
      </template>
      <template #item-order_status="props">
        {{ props.row != undefined && props.row.length > 0 ? props.row[props.row.length - 1].title : '-' }}
      </template>
      <template #item-action>
        <router-link :to="{ name: 'home' }"
          class="text-base text-blue-600 hover:text-blue-700 hover:text-underline">View</router-link>
      </template>
    </data-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, inject } from 'vue';
  import DataTable from '@/components/DataTable.vue';
  import type { Header } from "vue3-easy-data-table";

export default defineComponent({
  name: 'HomeView',
  components: { DataTable },
  setup() {
    const baseUrl = inject('baseUrl') as string;
    const formatDate = inject('formatDate') as CallableFunction;
    const columns = ref<Header[]>([
      {
        text: 'No. of Products',
        value: 'products',
        sortable: false,
      },
      {
        text: 'Amount',
        value: 'amount',
        sortable: true
      },
      {
        text: 'Order Status',
        value: 'order_status',
        sortable: false,
      },
      {
        text: 'Order Date',
        value: 'created_at',
        sortable: true,
      },
      {
        text: 'Action',
        value: 'action',
        sortable: false,
      }
    ]);
    const url = baseUrl + 'user/orders';
    return { columns, url, formatDate };
  }
});
</script>
