import {NextResponse} from "next/server";
import {prisma} from "@/core/prisma";
import {updateColumnDto} from "@/app/api/columns/dto";

interface ColumnContext {
    params: {
        id: string
    }
}

export async function PUT(req: Request, {params}: ColumnContext) {
    const {id} = params;
    const bodyRaw = await req.json();
    const validateBody = updateColumnDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400
        });
    }

    const findColumn = await prisma.columns.findUnique({
        where: {
            id,
        }
    });

    if (!findColumn) {
        return NextResponse.json([
            {
                code: 'not_found',
                messages: 'Board not found'
            }
        ])
    }

    const updatedColumn = await prisma.columns.update({
        where: {
            id,
        },
        data: validateBody.data
    })

    return NextResponse.json(updatedColumn);
}

export async function DELETE(req: Request, {params}: ColumnContext) {
    const {id} = params;

    const findColumn = await prisma.columns.findUnique({
        where: {
            id,
        }
    });

    if (!findColumn) {
        return NextResponse.json([
            {
                code: 'not_found',
                messages: 'Column not found'
            }
        ])
    }

    await prisma.columns.delete({
        where: {
            id,
        },
    })

    return NextResponse.json({}, {status: 200})
}
