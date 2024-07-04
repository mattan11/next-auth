'use client';

import { useState } from 'react';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { NewPasswordSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { newPassword } from '@/actions/new-password';
import { useSearchParams } from 'next/navigation';

export const NewPasswordForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const { control, setError, clearErrors, formState, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    // clearErrors();
    // setSuccess(undefined);

    const response = await newPassword(values, token); // server action
    if (response?.error) {
      setError('root', { type: 'manual', message: response.error });
      return;
    }

    if (response?.success) {
      setSuccess(response.success);
    }
  };

  return (
    <CardWrapper
      headerLabel={'Enter a new password'}
      backButtonLabel={'Back to login'}
      backButtonHref={'/sign-in'}
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={formState.errors.root?.message} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Loading...' : 'Set new password'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
