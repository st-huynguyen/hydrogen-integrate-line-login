import { useEffect, useState } from 'react';

const useFacebook = function () {
  const appId = import.meta.env.PUBLIC_FB_ID;
  const [isReady, setIsReady] = useState(false);

  const facebook = {
    login: async () => {
      const { authResponse, status } = await new Promise((resolve) =>
        window.FB.login(resolve, { scope: 'public_profile,email' })
      );
      if (!authResponse) return { status };

      return new Promise((resolve) =>
        window.FB.api(
          '/me',
          { locale: 'en_US', fields: 'name,email,picture' },
          (me) => {
            resolve(me);
          }
        )
      );
    },
  };

  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     FB.init({
  //       appId,
  //       autoLogAppEvents: true,
  //       xfbml: true,
  //       version: 'v8.0',
  //     });
  //     setIsReady(true);
  //   };

  //   (function (d, s, id) {
  //     if (d.getElementById(id)) {
  //       setIsReady(true);
  //       return;
  //     }

  //     const fjs = d.getElementsByTagName(s)[0];
  //     const js = d.createElement(s);
  //     js.id = id;
  //     js.src = `https://connect.facebook.net/en-US/sdk.js`;
  //     js.async = true;
  //     js.defer = true;
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, 'script', 'facebook-jssdk');
  // }, []);

  return [facebook, isReady];
};

export default useFacebook;
