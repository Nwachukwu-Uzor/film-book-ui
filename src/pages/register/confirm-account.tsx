import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

interface Props {
  baseUrl: string;
}

interface EmailValidationResponse {
  message: string;
}

const Index: FC<Props> = ({ baseUrl }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const { token, user_id } = router.query;
  console.log(router.query);
  console.log({ token, user_id });

  useEffect(() => {
    const token = router?.query?.token as string;
    const user_id = router?.query?.user_id as string;
    if (user_id && token) {
      validateEmailToken(token, user_id);
    }
  }, [router?.query]);

  const validateEmailToken = async (token: string, user_id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<EmailValidationResponse>(
        `${baseUrl}/auth/verify-email?token=${token}&user_id=${user_id}`
      );

      setResponseMessage(response?.data?.message);
    } catch (error: any) {
      setIsError(true);
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <div className="w-[80%] bg-red-300 py-4 px-3 rounded-md shadow-sm border border-red-300">
          <h1 className="text-xl lg:text-3xl font-bold">
            An Error has occurred
          </h1>
          <p className="my-3">{error}</p>
        </div>
      ) : (
        <div className="w-[80%] bg-green-200 py-4 px-3 rounded-md shadow-sm border border-green-200">
          <h1 className="text-xl lg:text-3xl font-bold">
            Email Confirmed Successfully
          </h1>
          <p className="my-3">{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const baseUrl =
    process.env.ENVIRONMENT === "Development"
      ? process.env.SERVER_BASE_URL_DEVELOPMENT
      : process.env.SERVER_BASE_URL_PRODUCTION;

  return {
    props: {
      baseUrl: baseUrl ?? "",
    },
  };
};

export default Index;
