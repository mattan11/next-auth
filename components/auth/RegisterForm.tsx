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
import { RegisterSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { register } from '@/actions/register';

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const { control, setError, clearErrors, formState, handleSubmit } = form;

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // clearErrors();
    // setSuccess(undefined);

    startTransition(async () => {
      const response = await register(values); // server action
      if ('error' in response) {
        setError('root', { type: 'manual', message: response.error });
        return;
      }

      if ('success' in response) {
        setSuccess(response.success);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel={'Create an account!'}
      backButtonLabel={'Already have an account?'}
      backButtonHref={'/sign-in'}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
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
            disabled={isPending}
          >
            {/*{formState.isSubmitting ? 'Loading...' : 'Create an account'}*/}
            {isPending ? 'Loading...' : 'Create an account'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
