interface Wish {
    title: string,
    description: string,
    user?: User,
    userId: number;
}

interface User {
    id?: number
    email: string,
    avatarUrl: string,
    wishes?: Wish[]
}