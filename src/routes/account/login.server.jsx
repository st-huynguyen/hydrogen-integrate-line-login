import React, { Suspense } from 'react';
import { Layout } from '../../components/Layout.server';
import LineLogin from '../../components/LineLogin.client';
import FacebookLogin from '../../components/FacebookLogin.client';

const Login = () => {
  return (
    <Layout>
      <Suspense></Suspense>
      <section className="w-full max-w-md mx-auto gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <LineLogin />
        <FacebookLogin />
      </section>
    </Layout>
  );
};

export default Login;
