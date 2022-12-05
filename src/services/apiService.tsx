export type ApiPropsType = {
  base: string;
  url: string;
  method?: string;
  header?: any;
  body?: any;
};

export type ApiResponseType = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};

export const apiService = async (props: ApiPropsType) => {
  try {
    const apiResponse = await fetch(
      `${props.base}${props.url}`,
      // `https://odoo-restapi.herokuapp.com/api${props.url}`,
      {
        method: props.method ?? "get", // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "omit", // include, *same-origin, omit
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: {
          // "Content-type": "charset=UTF-8",
          // Authorization: "Bearer s6G8iq3ioWGpea6BwATp84l1EnBeKYlq",
          // Accept: "application/json",
        },
        body: props.body,
      }
    );

    if (apiResponse.status === 200) {
      const json = await apiResponse.json();
      return json;
    } else {
      return apiResponse;
    }
  } catch (error) {
    return {
      error: true,
      content: `${error}`,
    };
  }
};
