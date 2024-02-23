import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getProducts,
  getProductsPath,
} from "../../../components/product/PageList";
import { PagedCollection } from "../../../types/collection";
import { Product } from "../../../types/Product";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getProductsPath(page), getProducts(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Product>>("/products");
  const paths = await getCollectionPaths(
    response,
    "products",
    "/products/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
