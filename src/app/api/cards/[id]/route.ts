import {NextResponse} from "next/server";
import {prisma} from "@/core/prisma";
import {updateCardDto} from "@/app/api/cards/dto";

interface CardContext {
    params: {
        id: string
    }
}

export async function PATCH(req: Request, {params}: CardContext) {
    const {id} = params;
    const bodyRaw = await req.json();
    const validateBody = updateCardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400
        });
    }

    const findCard = await prisma.cards.findUnique({
        where: {
            id,
        }
    });

    if (!findCard) {
        return NextResponse.json([
            {
                code: 'not_found',
                messages: 'Board not found'
            }
        ])
    }

    const updateCard = await prisma.cards.update({
        where: {
            id,
        },
        data: validateBody.data
    })

    return NextResponse.json(updateCard);
}

export async function DELETE(req: Request, {params}: CardContext) {
    const {id} = params;

    const findCard = await prisma.cards.findUnique({
        where: {
            id,
        }
    });

    if (!findCard) {
        return NextResponse.json([
            {
                code: 'not_found',
                messages: 'Card not found'
            }
        ])
    }

    await prisma.cards.delete({
        where: {
            id,
        },
    })

    return NextResponse.json({}, {status: 200})
}
