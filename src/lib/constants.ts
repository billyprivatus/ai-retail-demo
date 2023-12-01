export type Client = {
  name: string;
  namespace: string;
  hidden?: boolean;
};

export const clientList: Client[] = [
  {
    name: 'Temporary',
    namespace: 'retail-client-temporary',
  },
  {
    name: 'Client A',
    namespace: 'retail-client-company-a',
  },
  {
    name: 'Client B',
    namespace: 'retail-client-company-b',
  },
  {
    name: 'Client C',
    namespace: 'retail-client-company-c',
  },
  {
    name: 'Client D',
    namespace: 'retail-client-company-d',
  },
  {
    name: 'ChatGPT',
    namespace: 'some-unknown-namespace',
    hidden: true,
  },
];
