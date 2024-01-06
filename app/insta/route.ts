import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const {
        url,
        caption,
    } = await req.json();

    console.log("coucou")

    try {

        return NextResponse.json({}, {status: 200})

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({error: 'Service Unavailable'}, {status: 503})
    }
}
