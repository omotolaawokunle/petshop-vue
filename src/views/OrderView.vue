<template>
    <div v-show="!loading" class="p-8 pb-0 wrapper">
        <div class="flex items-center justify-end">
            <button type="button" @click="downloadOrder"
                class="inline-flex items-center justify-center p-2 text-sm font-medium text-center text-white rounded login bg-main disabled:bg-opacity-50">
                Download PDF
            </button>
        </div>
        <div ref="content">
            <div class="grid grid-cols-12 gap-4 px-8 py-4">
                <div class="col-span-12 p-4 bg-white border border-gray-200 rounded shadow sm:col-span-6">
                    <h6 class="font-bold">Order Details</h6>
                    <div class="grid grid-cols-2 gap-4">
                        <span class="text-sm text-gray-600">Order ID</span>
                        <span class="text-sm">{{ order.uuid }}</span>
                        <span class="text-sm text-gray-600">Order Date</span>
                        <span class="text-sm">{{ formatDate(order.created_at) }}</span>
                        <span class="text-sm text-gray-600">Order Status</span>
                        <span
                            class="text-sm">{{ order.order_status?.length > 0 ? order.order_status[order.order_status.length - 1].title : '-' }}</span>
                    </div>
                </div>
                <div class="col-span-12 p-4 bg-white border border-gray-200 rounded shadow sm:col-span-6">
                    <h6 class="font-bold">Customer Details</h6>
                    <div class="grid grid-cols-2 gap-4">
                        <span class="text-sm text-gray-600">Order By</span>
                        <span class="text-sm">{{ order.user?.first_name + ' ' + order.user?.last_name }}</span>
                        <span class="text-sm text-gray-600">ID</span>
                        <span class="text-sm">{{ order.user?.uuid }}</span>
                        <span class="text-sm text-gray-600">Email</span>
                        <span class="text-sm">{{ order.user?.email }}</span>
                        <span class="text-sm text-gray-600">Phone</span>
                        <span class="text-sm">{{ order.user?.phone_number }}</span>
                        <span class="text-sm text-gray-600">Address</span>
                        <span class="text-sm">{{ order.user?.address }}</span>
                    </div>
                </div>
                <div class="col-span-12 p-4 bg-white border border-gray-200 rounded shadow sm:col-span-6">
                    <h6 class="font-bold">Billing/Shipping Details</h6>
                    <div class="grid grid-cols-2 gap-4">
                        <span class="text-sm text-gray-600">Billing</span>
                        <span class="text-sm">{{ order.address?.billing }}</span>
                        <span class="text-sm text-gray-600">Shipping</span>
                        <span class="text-sm">{{ order.address?.shipping }}</span>
                    </div>
                </div>
            </div>
            <div class="mx-8 items">
                <div class="flex justify-between px-3 py-2 mb-2 item" v-for="item, index in order.products"
                    :key="`product-${index}`">
                    <p class="flex-1 mb-0 text-sm">{{ item.product }}</p>
                    <div class="grid grid-cols-2 gap-1 text-sm">
                        <span class="font-semibold">Unit Price:</span>
                        <span>¥{{ toTwoDecimalPlaces(item.price) }}</span>
                        <span class="font-semibold">Qty:</span> <span>{{ item.quantity }}</span>
                        <span class="font-semibold">Total:</span>
                        <span>¥{{ toTwoDecimalPlaces(item.quantity * item.price) }}</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3 px-5 py-3 my-4 payment">
                <span class="text-sm text-gray-600">Subtotal</span>
                <span class="text-sm text-right">¥{{ toTwoDecimalPlaces(order.amount) }}</span>
                <span class="text-sm text-gray-600">Delivery Fee</span>
                <span class="text-sm text-right">¥{{ toTwoDecimalPlaces(order.delivery_fee) }}</span>
                <span class="text-sm text-gray-600">TOTAL</span>
                <span class="text-sm text-right">¥{{ toTwoDecimalPlaces(order.amount + order.delivery_fee) }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, inject } from 'vue';
    import { Order } from '@/types/Order';
    import { useRoute } from 'vue-router';
    import axios from 'axios';
    import { NonPaginated } from '@/types/ApiResponse';
    import { useToast } from 'vue-toastification';
    import html2pdf from "html2pdf.js";

    export default defineComponent({
        name: 'OrderView',
        setup() {
            const baseUrl = inject('baseUrl') as string;
            const formatDate = inject('formatDate') as CallableFunction;
            const toTwoDecimalPlaces = inject('toLocale') as CallableFunction;
            const order = ref<Order>({});
            const route = useRoute();
            const url = baseUrl + 'order/' + route.params.id;
            const toast = useToast();
            const loading = ref(false);
            const content = ref();
            return { route, url, formatDate, order, toast, loading, toTwoDecimalPlaces, content };
        },
        mounted() {
            this.loading = true;
            axios.get<NonPaginated>(this.url).then(response => {
                this.order = response.data.data;
            }).catch(error => {
                this.toast.error("Error loading data: " + error.response.data.error ?? error.response.data.message)
            }).finally(() => this.loading = false);
        },
        methods: {
            downloadOrder() {
                const order = this.order;
                var opt = {
                    margin: 0.3,
                    filename: `Order-${order.uuid}.pdf`,
                    image: { type: 'jpeg', quality: 1.0 },
                    html2canvas: { scale: 1 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                };

                html2pdf().set(opt).from(this.content).save();
            },
        }
    });
</script>
<style>
    .item {
        background: #F4F6FA;
    }

    .payment {
        border: 1px solid #D8DAE5;
        border-left: none;
        border-right: none;
    }
</style>