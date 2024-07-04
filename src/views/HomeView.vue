<template>
  <div class="home">
    <data-table :url="url" :columns="columns" :line-numbers="true">
      <template #item-products="{ row }">
        {{ row.col.products.length }}
      </template>
      <template #item-created_at="{ row }">
        {{ formatDate(row.col.created_at) }}
      </template>
      <template #item-order_status="{ row }">
        {{ row.col.order_status.length > 0 ? row.col.order_status[row.col.order_status.length - 1].title : '-' }}
      </template>
      <template #item-uuid="{ row }">
        <router-link :to="{ name: 'view-order', params: { id: row.col.uuid } }"
          class="text-blue-600 hover:text-blue-700 hover:text-underline">View</router-link>
      </template>
      <template #item-amount="{ row }">
        {{ '¥' + toTwoDecimalPlaces(row.col.amount) }}
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
    const toTwoDecimalPlaces = inject('toLocale') as CallableFunction;
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
        value: 'uuid',
        sortable: false,
      }
    ]);
    const url = baseUrl + 'user/orders';
    return { columns, url, formatDate, toTwoDecimalPlaces };
  },
});
</script>
