import React from 'react'
import { db } from '@/db'
import {usersTable, postsTable} from '@/db/schema'

async function getMessageFromApi() {
  try {
    const response = await fetch('http://localhost:3000/api', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Explicitly instructs the browser to bypass the cache
      },
      cache: 'no-store', 
    })
    
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

async function getPosts() {
  try {
    const posts = await db.query.postsTable.findMany()
    
    return posts
  } catch (error) {
    console.log(error)
  }
}


export default async function Home() {
  const resp = await getMessageFromApi()
  const posts = await getPosts()

  return (
    <>
      <div>Home Page</div>
      <ul>
        {resp && resp.map((resp: any) => {
          return <li key={resp.id}>
            {resp.content}
          </li>
        })}
      </ul>
         
      <form action={ async () => {
        'use server'
          await db.insert(usersTable).values({
            name: "8333388", 
            age: 20,
            email: '888@gmail.com'
          })
          await db.insert(postsTable).values({
            userId: 1, 
            title: '86767888',
            content: 'oooooo'
          })
        }
      }>
        <button>SUBMIT</button>
      </form>
    </>
   

  )
}
