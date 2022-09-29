import React, { useState } from 'react';
import useFacebook from '../hook/useFacebook';

const FacebookLogin = () => {
  const [facebook, isFacebookReady] = useFacebook();
  const [token, setToken] = useState();

  const handleFacebookLogin = async () => {
    const response = await facebook.login();
    setToken(response);
    console.log(response);
  };

  return (
    <>
      {!token ? (
        <button
          disabled={!isFacebookReady}
          onClick={handleFacebookLogin}
          className="bg-[#4267B2] text-white px-2 py-2.5 flex justify-center items-center gap-2 rounded-lg"
        >
          <img className="w-4" src="/facebook.svg" alt="Facebook logo" />
          <span className="font-medium">Login with Facebook</span>
        </button>
      ) : (
        <h2 className="text-center">
          Logined with Facebook successfully! <br />
          See response data in console.
        </h2>
      )}
    </>
  );
};

export default FacebookLogin;
