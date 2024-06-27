import React from 'react';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorCard = () => {
  return (
    // <Card className="w-[400px] shadow-md">
    //   <CardHeader>
    //     <Header label="Oops! Something went wrong!"/>
    //   </CardHeader>
    //   <CardFooter>
    //     <BackButton href="/sign-in" label="Back to Sign In"/>
    //   </CardFooter>
    // </Card>
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/sign-in"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
