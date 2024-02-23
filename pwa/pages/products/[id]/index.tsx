import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Show } from "../../../components/product/Show";
import { PagedCollection } from "../../../types/collection";
import { Product } from "../../../types/Product";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getProduct = async (id: string | string[] | undefined) =>
  id ? await fetch<Product>(`/products/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: product, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Product> | undefined>(["product", id], () =>
      getProduct(id)
    );
  const productData = useMercure(product, hubURL);

  if (!productData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Product ${productData["@id"]}`}</title>
        </Head>
      </div>
      <Show product={productData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["product", id], () => getProduct(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Product>>("/products");
  const paths = await getItemPaths(response, "products", "/products/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
