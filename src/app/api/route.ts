import { NextResponse } from "next/server";
import { db } from '@/db'

async function getPosts() {
  try {
    const posts = await db.query.postsTable.findMany()
    
    return posts
  } catch (error) {
    console.log(error)
  }
}

export async function GET(req:Request) {
  const posts  = await getPosts()

  const response =  NextResponse.json(posts)
  return response
}