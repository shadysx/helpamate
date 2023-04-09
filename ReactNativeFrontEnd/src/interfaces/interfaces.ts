interface Wish {
    id: number,
    title: string,
    description: string,
    user: User
}

interface User {
    username: string,
    avatarUrl: string,
    wishes: Wish[]
}