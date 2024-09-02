import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.formData();
  const promises = [];

  for (const [key, value] of data.entries()) {
    // Check if the value is a file by ensuring it has a `type` and `arrayBuffer` method
    if (value && typeof value.arrayBuffer === 'function' && value.type === 'image/jpeg') {
      const bytes = await value.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const name = Date.now() + '-' + Math.random().toString(36).substring(7); // Ensure unique names
      const path = `./public/${name}.jpg`;
      
      const promise = writeFile(path, buffer);
      promises.push(promise);
    }
  }

  // Wait for all file writes to complete
  await Promise.all(promises);

  return NextResponse.json({ success: true, message: 'Files saved successfully' });
};
