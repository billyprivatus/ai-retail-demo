import { Pinecone } from '@pinecone-database/pinecone';

/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */

if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('Missing Pinecone index name in .env file');
}

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? '';

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing');
}

const pinecone = new Pinecone({
  environment: process.env.PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
  apiKey: process.env.PINECONE_API_KEY ?? '',
});

export { PINECONE_INDEX_NAME, pinecone };
