import {z} from "zod";

export const createBoardDto = z.object({
    title: z.string().min(1).max(20),
})
