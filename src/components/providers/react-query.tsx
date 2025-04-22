'use client';

import { IErrorResponse } from "@/interfaces/api";
import { useDebouncedCallback } from 'use-debounce';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { logger } from "@/lib/logger";
import { errorToast } from "../toasts";

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  const signOut = useDebouncedCallback(() => {
    //Implement this method
  }, 500);

  const errorHandler = async (err: IErrorResponse) => {
    if (err?.response?.data) {
      if (err?.response?.status === 401) {
        signOut();
      } else if (err?.response?.data?.errors) {
        err?.response?.data?.errors?.map((item) => {
          errorToast({
            title: item.code?.split("_").join(" "),
            description: item?.message || '',
          });
        });
      }
    } else if (err?.request) {
      // errorToast({
      //   description: `[${err?.code}] ${errorMessages[err?.code]} (${err?.message})`
      // });
    }

    // logger.info(
    //   `${err?.response?.status || ''} ${err?.code || 'NO_ERR_CODE'} API Error`
    // );
    console.log(err);
  };

  queryClient.setDefaultOptions({
    queries: {
      retry: false
    },
    mutations: {
      retry: false,
      onSettled: (_, error: unknown) => {
        if (error) {
          errorHandler(error as IErrorResponse);
        }
      },
    },
  });
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  );
};