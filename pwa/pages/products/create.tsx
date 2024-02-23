import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/product/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Product</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
