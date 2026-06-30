import API_URL from "./api";

import type { Tag } from "../types/Tag";

export async function getTags(): Promise<Tag[]> {

    const response = await fetch(`${API_URL}/tags`);

    if (!response.ok) {

        throw new Error("Error al obtener las etiquetas");

    }

    return await response.json();

}