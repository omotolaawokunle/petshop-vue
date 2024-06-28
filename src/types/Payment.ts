interface Payment{
    uuid: string,
    type: string,
    details: object,
    created_at: string | null,
    updated_at: string | null
}
export default Payment;