<template>
    <div class="relative overflow-x-auto">
        <EasyDataTable v-model:server-options="serverOptions" :server-items-length="totalRecords" :loading="loading"
            :headers="columns" :items="rows" show-index>
            <template v-for="column in columns" #[`item-${column.value}`]="col">
                <slot :name="`item-${column.value}`" :row="{ col, field: column.value }">
                    {{ col[column.value] }}
                </slot>
            </template>
        </EasyDataTable>
    </div>
</template>

<script lang="ts">
    import { PropType, defineComponent, ref } from 'vue';
    import { useAuthStore } from '@/store/auth';
    import { useRouter } from 'vue-router';
    import EasyDataTable from 'vue3-easy-data-table';
    import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
    import 'vue3-easy-data-table/dist/style.css';
    import { Paginated } from '@/types/ApiResponse';
    import axios from 'axios';
    import { useToast } from 'vue-toastification';

    export default defineComponent({
        name: 'DataTable',
        components: {
            EasyDataTable,
        },
        props: {
            url: { type: String, required: true },
            columns: { type: Array as PropType<Header[]>, required: true },
            lineNumbers: { type: Boolean, default: false }
        },
        computed: {
            urlWithParams(): string {
                const { page, rowsPerPage, sortBy, sortType } = this.serverOptions;
                if (sortBy && sortType) {
                    return `${this.url}?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}&desc=${sortType == 'desc' ? 'true' : 'false'}`;
                } else {
                    return `${this.url}?page=${page}&limit=${rowsPerPage}`;
                }
            }
        },
        setup() {
            const store = useAuthStore();
            const router = useRouter();
            let rows = ref<Item[]>([]);
            let loading = ref(false);
            let totalRecords = ref(0);
            const serverOptions = ref<ServerOptions>({
                sortBy: '',
                sortType: 'desc',
                page: 1,
                rowsPerPage: 10
            });
            const toast = useToast();
            return { store, router, rows, loading, totalRecords, serverOptions, toast };
        },
        methods: {
            async loadItems() {
                this.loading = true;
                await axios.get<Paginated>(this.urlWithParams).then(response => {
                    this.totalRecords = response.data.total;
                    this.rows = response.data.data;
                }).catch(error => {
                    this.toast.error("Error loading data: " + error.response.data.error ?? error.response.data.message)
                }).finally(() => this.loading = false);
            }
        },
        mounted() {
            this.loadItems();
        },
        watch: {
            serverOptions: {
                deep: true,
                handler: function () {
                    this.loadItems();
                }
            },
        }

    });
</script>
