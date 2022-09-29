import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const LineLogin = () => {
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState();

  const redirectURI = import.meta.env.PUBLIC_REDIRECT_URL;
  const clientId = import.meta.env.PUBLIC_CLIENT_ID;
  const clientSecret = import.meta.env.PUBLIC_CLIENT_SECRET;

  const authorizationParams = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectURI,
    state: Math.random().toString(26).slice(2),
    scope: 'profile openid email',
  };
  const searchParams = new URLSearchParams(authorizationParams).toString();
  const lineAuthoriseURL = `https://access.line.me/oauth2/v2.1/authorize?${searchParams}`;

  useEffect(() => {
    const returnCode = new URLSearchParams(document.location.search).get(
      'code'
    );

    if (returnCode) {
      const reqUrl = 'https://api.line.me/oauth2/v2.1/token';
      const reqBody = {
        grant_type: 'authorization_code',
        code: returnCode,
        redirect_uri: redirectURI,
        client_id: clientId,
        client_secret: clientSecret,
      };
      const reqConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      setIsLoading(true);
      axios
        .post(reqUrl, qs.stringify(reqBody), reqConfig)
        .then((res) => {
          console.log('LINE');
          console.log(res.data);
          console.log('-------');
          setToken(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <h2 className="text-center">Authorizing...</h2>;
  }

  return (
    <>
      {!token ? (
        <a
          className="bg-[#06C755] text-white px-2 py-2.5 flex justify-center items-center gap-2 rounded-lg"
          href={lineAuthoriseURL}
        >
          <img className="w-4" src="/line.svg" alt="Line logo" />
          <span className="font-medium">Login with LINE</span>
        </a>
      ) : (
        <h2 className="text-center">
          Logined with LINE successfully! <br />
          See response data in console.
        </h2>
      )}
    </>
  );
};

export default LineLogin;
