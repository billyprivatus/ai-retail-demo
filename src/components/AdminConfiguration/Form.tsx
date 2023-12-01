'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import FileUpload from './FileUpload';
import { useState } from 'react';
import { clientList } from '@/lib/constants';
import useFlowise from '@/lib/useFlowise';
import LoadingDialog from '@/components/LoadingDialog/LoadingDialog';

const settingFormSchema = z.object({
  namespace: z.string({
    required_error: 'Please select a namespace for vectorstore.',
  }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
});

type SettingFormValues = z.infer<typeof settingFormSchema>;

const defaultValues: Partial<SettingFormValues> = {
  namespace: clientList[0].namespace,
  urls: [],
};

export function SettingForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(settingFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  const { dataUpload } = useFlowise();

  const handleAddURL = () => {
    if (fields.length >= 3) {
      return toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Maximum of 3 websites can be added',
      });
    }

    append({ value: '' });
  };

  const handleFileChange = (newFiles: File[]) => {
    const nonPdfFiles = Array.from(newFiles).some((i) => !i.type.includes('pdf'));

    if (nonPdfFiles) {
      return toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Only PDF files are allowed',
      });
    }

    if (newFiles.some((i) => i.size > 4000000)) {
      return toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'File too large. Max 4MB',
      });
    }

    const alreadyExists = newFiles.some((obj, i) => i === files.findIndex((o) => obj.name === o.name));

    if (alreadyExists) {
      toast({
        title: 'Warning',
        description: 'Some files already existed',
      });
    }

    setFiles((prev) => {
      const mergedFiles = [...prev, ...newFiles];

      const uniques = mergedFiles.filter((obj, index) => {
        return index === mergedFiles.findIndex((o) => obj.name === o.name);
      });

      return uniques;
    });
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: SettingFormValues) => {
    // if (!data.urls?.length) {
    //   return toast({
    //     variant: 'destructive',
    //     title: 'Failed',
    //     description: 'Please provide at least one website',
    //   });
    // }

    // if (!files.length) {
    //   return toast({
    //     variant: 'destructive',
    //     title: 'Failed',
    //     description: 'Please provide at least PDF documents',
    //   });
    // }

    try {
      setSubmitting(true);

      let formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file, file.name);
      });

      // Hard code default files
      if (!files.length) {
        const fileRaw = await fetch('/blank.pdf');
        const fileBlob = await fileRaw.blob();
        const defaultFile = new File([fileBlob], 'blank.pdf');
        formData.append('files', defaultFile);
      }

      // Hard code default URL values
      [...new Array(3)].forEach((_, i) => {
        formData.append(`url[cheerioWebScraper_${i}]`, data.urls?.[i]?.value || 'https://www.lipsum.com/');
        formData.append(`limit[cheerioWebScraper_${i}]`, data.urls?.[i]?.value ? '10' : '1');
      });

      formData.append('pineconeNamespace', data.namespace);
      // formData.append('question', 'test');

      await dataUpload(formData);

      return toast({
        title: 'Success',
        description: 'AI has been updated',
      });
    } catch (error) {
      return toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Error uploading settings to AI',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='namespace'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namespace</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a namespace for vectorstore' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientList
                    .filter((i) => !i.hidden)
                    .map((client) => (
                      <SelectItem key={client.namespace} value={client.namespace}>
                        {client.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The selected namespace of the vectorstore (Pinecone) will be overwritten by the data below.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {!fields.length && (
            <>
              <FormLabel>Scrap Websites</FormLabel>
              <FormDescription className='my-2'>
                Add links for the AI to scrapes. <b>AI will scrapes up to 10 relative links</b>
              </FormDescription>
              <FormDescription className='my-2 text-xs'>
                For example, https://help.lyft.com/hc/en-us/rider/categories/2872191865-riding-with-lyft
              </FormDescription>
            </>
          )}
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>Scrap Websites</FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links for the AI to scrapes. <b>AI will scrapes up to 10 relative links</b>
                  </FormDescription>
                  <FormDescription className={cn(index !== 0 && 'sr-only', 'text-xs')}>
                    For example, https://help.lyft.com/hc/en-us/rider/categories/2872191865-riding-with-lyft
                  </FormDescription>
                  <div className='flex items-center gap-2'>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <CrossCircledIcon color='red' className='text:lg cursor-pointer' onClick={() => remove(index)} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type='button' variant='outline' size='sm' className='mt-2' onClick={handleAddURL}>
            Add URL
          </Button>
        </div>

        <div>
          <FormLabel>Extra Documents</FormLabel>
          <FormDescription className='my-2'>Add documents to the AI knowledge base</FormDescription>
          <FileUpload accept='application/pdf' files={files} onChange={handleFileChange} onDelete={handleRemoveFile} />
        </div>

        <Button type='submit' className='w-full'>
          Submit
        </Button>
      </form>
      <LoadingDialog
        open={isSubmitting}
        title='In Progress...'
        description='Please wait a moment while the AI is embedding the data into the vector store.'
      />
    </Form>
  );
}
