const useFlowise = () => {
  const dataUpload = async (formData: FormData) => {
    const namespace = formData.get('pineconeNamespace');

    // Delete existing data in the namespace
    await fetch('/api/vectorstore/remove', {
      method: 'POST',
      body: JSON.stringify({ namespace }),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FLOWISE_URL}/api/v1/prediction/${process.env.NEXT_PUBLIC_FLOWISE_UPLOAD_ID}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const result = await response.json();
    return result;
  };

  return { dataUpload };
};

export default useFlowise;
