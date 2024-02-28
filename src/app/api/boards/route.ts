import {NextResponse} from "next/server";
import {createBoardDto} from "@/app/api/boards/dto";
import {prisma} from "@/core/prisma";

export async function POST(req: Request) {
    const bodyRaw = await req.json();
    const validateBody = createBoardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400
        });
    }

    const {title} = validateBody.data;

    const newBoard = await prisma.boards.create({
        data: {
            title,
        },
    });

    return NextResponse.json(newBoard);
}

