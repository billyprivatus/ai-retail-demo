import { NextResponse } from 'next/server';

import { PINECONE_INDEX_NAME, pinecone } from '@/lib/pinecone';

export async function POST(request: Request) {
  const { namespace } = await request.json();

  try {
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    if (!namespace) throw Error('Namespace is required');
    await index.namespace(namespace).deleteAll();

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
