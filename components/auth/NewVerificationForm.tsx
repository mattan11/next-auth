'use client';

import { CardWrapper } from '@/components/auth/CardWrapper';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    setIsLoading(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, error, success]);

  // useEffect(() => {
  //   onSubmit();
  // }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/sign-in"
    >
      <div className="flex flex-col items-center w-full justify-center">
        <Button
          className="mb-3"
          onClick={onSubmit}
          disabled={!!success || isLoading}
        >
          <span>{isLoading ? 'Verifying' : 'Verify'}</span>
        </Button>
        {/*{isLoading && <BeatLoader color="#000" />}*/}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
