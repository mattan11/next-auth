'use client';

import React, { useTransition } from 'react';
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
import { ResetSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { reset } from '@/actions/reset';

export const ResetForm = () => {
  // const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const { control, setError, clearErrors, formState, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    // clearErrors();
    // setSuccess(undefined);

    const response = await reset(values); // server action
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
      headerLabel={'Forgot your password?'}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e-mail"
                      {...field}
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
            {formState.isSubmitting ? 'Loading...' : 'Login'}
            {/*{isPending ? 'Loading...' : 'Send Reset Email'}*/}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
