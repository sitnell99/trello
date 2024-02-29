import {createBoardDto} from "@/app/api/boards/dto";
import {NextResponse} from "next/server";
import {prisma} from "@/core/prisma";

interface BoardContext {
    params: {
        id: string
    }
}

export async function PATCH(req: Request, {params}: BoardContext) {
    const {id} = params;
    const bodyRaw = await req.json();
    const validateBody = createBoardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400
        });
    }

    const findBoard = await prisma.boards.findUnique({
        where: {
            id,
        }
    });

    if (!findBoard) {
        return NextResponse.json([
            {
                code: 'not_found',
                messages: 'Board not found'
            }
        ])
    }

    const updatedBoard = await prisma.boards.update({
        where: {
            id,
        },
        data: validateBody.data
    })

    return NextResponse.json(updatedBoard);
}

export async function DELETE(req: Request, {params}: BoardContext) {
    const {id} = params;

    const findBoard = await prisma.boards.findUnique({
        where: {
            id,
        }
    });

    if (!findBoard) {
        return NextResponse.json([
            {
                code: 'not_found',
                messages: 'Board not found'
            }
        ])
    }

    await prisma.boards.delete({
        where: {
            id,
        },
    })

    return NextResponse.json({}, {status: 200})
}
