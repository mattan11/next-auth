'use client';

import React from 'react';
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
import { LoginSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
  const [success, setSuccess] = React.useState<string | undefined>();
  const [showTwoFactor, setShowTwoFactor] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different Provider'
      : '';

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control, setError, clearErrors, formState, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    // clearErrors();
    // setSuccess(undefined);
    try {
      const response = await login(values, callbackUrl); // server action
      if (response?.error) {
        setError('root', { type: 'manual', message: response.error });
        return;
      }

      if (response?.success) {
        setSuccess(response.success);
      }

      if (response?.twoFactor) {
        setShowTwoFactor(true);
      }
    } catch (error) {
      setError('root', { type: 'manual', message: 'Something went wrong' });
    }
  };

  return (
    <CardWrapper
      headerLabel={'Welcome Back!'}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={'/sign-up'}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <>
            {!showTwoFactor && (
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
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href={'/reset'}>Forgot Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {showTwoFactor && (
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
          <FormError message={formState.errors.root?.message || urlError} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting
              ? 'Loading...'
              : showTwoFactor
                ? 'Confirm'
                : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
