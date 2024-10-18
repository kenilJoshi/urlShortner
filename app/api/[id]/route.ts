import { NextRequest, NextResponse } from 'next/server';
import {connectionToDatabase} from '@/app/lib/mongodb';
import ShortUrl from '@/app/models/ShortUrl';

export async function GET(req: NextRequest) {
    const path = req.nextUrl.pathname
    const id = path.split("/").pop()


    await connectionToDatabase()
    console.log(req);
    const urls = await ShortUrl.findOne({shortCode: id}).exec()

    if (urls) {
        return NextResponse.redirect(urls.originalUrl);
    } else {
        return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }
    
//   return NextResponse.json({ message: "Kenil here" }, { status: 200 });
}