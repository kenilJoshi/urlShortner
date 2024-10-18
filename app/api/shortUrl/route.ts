import { NextRequest, NextResponse } from 'next/server';
import {connectionToDatabase} from '@/app/lib/mongodb';
import ShortUrl from '@/app/models/ShortUrl';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {

    const client = await connectionToDatabase()
    console.log(client);
    const urls = await ShortUrl.findOne({}).exec()

    console.log(urls);
    
  return NextResponse.json({ message: "Kenil" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const referenceTable = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

   await connectionToDatabase()
  console.log(data);
  
   const findUrl = await ShortUrl.findOne({
    originalUrl: data.url    
   })

   if(findUrl == null){
    const uniqueId = uuidv4();

    let numericID = 1
    for(let i=0;i<uniqueId.length;i++){
      const ch = uniqueId[i]

      const val = ch.charCodeAt(0)

      if(val >= 48 && val <= 57){
        numericID += (val - 48);
      }else if(val >= 65 && val <= 90){
        numericID += (val - 65 + 11);
      }else if(val >= 97 && val <= 122){
        numericID += (val - 97 + 73);
      }
    }
    const salt = Math.ceil(Math.random()*100)*23;
    numericID = numericID * salt;
    // console.log("--------->>>",numericID);
    
    let genHashVal ="";
    let dummyId = numericID;

    while(dummyId > 0){
      const rem = dummyId % 62;
      genHashVal += referenceTable[rem];
      // console.log("-------->>>>>>>>",rem);
      
      dummyId = Math.floor(dummyId/62);
  }
  const hashValue = genHashVal;

  // console.log(hashValue);
  const createShortUrl = await ShortUrl.create({
    originalUrl: data.url,
    shortCode:hashValue
  })
    
    return NextResponse.json({ message: "Short URL   created", data: createShortUrl }, { status: 201 });

   }else{

    return NextResponse.json({ message: "Short URL   created", data: findUrl }, { status: 201 });
   }


}


// nDU34V7dV1lszVej
// keniljoshi3

// mongodb+srv://keniljoshi3:nDU34V7dV1lszVej@cluster0.m1f8s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0