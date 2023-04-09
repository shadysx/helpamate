interface Wish {
    id: number,
    title: string,
    description: string,
    user: User
}

interface User {
    email: string,
    avatarUrl: string,
    wishes?: Wish[]
}