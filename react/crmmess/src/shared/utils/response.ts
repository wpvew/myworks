type Tresponse = {
  payload: Record<string, any> | null;
  error: unknown;
};

export const response = ({ payload = null, error = '' }: Tresponse) => {
  return JSON.parse(
    JSON.stringify({
      payload,
      error,
    })
  );
};
