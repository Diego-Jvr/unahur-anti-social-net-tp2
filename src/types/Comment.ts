import type { User } from "./User";

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    PostId: number;
    UserId: number;
    User: User;
}