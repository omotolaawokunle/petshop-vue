interface User{
    uuid: string,
    first_name: string,
    last_name: string,
    email: string,
    email_verified_at: string | null,
    avatar: string,
    address: string,
    phone_number: string | number,
    is_marketing: boolean | number,
    created_at: string | null,
    updated_at: string | null,
    last_login_at: string | null
}

export default User;