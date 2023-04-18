

interface User {
    id?: number
    username: string,
    email: string,
    avatarUrl: string,
    wishes?: Wish[]
}

interface UserRegisterDTO {
    username: string,
    email: string,
    password: string
}

interface UserLoginDTO {
    email: string,
    password: string
}

interface Wish {
    id: number,
    title: string,
    description: string,
    user?: User
}

interface WishCreationDTO {
    title: string,
    description: string,
    userId: number
}

interface WishUpdateDTO {
    id: number,
    title: string,
    description: string,
}