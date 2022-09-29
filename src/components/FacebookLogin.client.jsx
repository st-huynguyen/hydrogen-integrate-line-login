import React, { useState, useEffect } from 'react';

const FacebookLogin = () => {
  const appId = import.meta.env.PUBLIC_FB_ID;
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState();

  const handleFacebookLogin = async () => {
    const { authResponse, status } = await new Promise((resolve) =>
      window.FB.login(resolve, { scope: 'public_profile,email' })
    );
    if (!authResponse) {
      return { status };
    }
    console.log(authResponse);
    setToken(authResponse);
  };

  useEffect(() => {
    console.log('1');
    window.fbAsyncInit = function () {
      FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v8.0',
      });
      setIsReady(true);
      console.log('2');
    };

    (function (d, s, id) {
      if (d.getElementById(id)) {
        setIsReady(true);
        return;
      }
      console.log('3');

      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/en-US/sdk.js`;
      js.async = true;
      js.defer = true;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return (
    <>
      {!token ? (
        <button
          disabled={!isReady}
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
