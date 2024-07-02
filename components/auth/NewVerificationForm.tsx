'use client';

import { CardWrapper } from '@/components/auth/CardWrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Token is missing!');
      return;
    }

    newVerification(token)
      .then(data => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(error => {
        setError(error.message || 'An error occurred!');
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/sign-in"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color="#000" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
