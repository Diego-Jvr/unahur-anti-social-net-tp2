import type { User } from "./User";
import type { Tag } from "./Tag";

export interface Post {
    id: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    User: User;
    Tags: Tag[];
}