import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Product } from "../../types/Product";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getProductsPath = (page?: string | string[] | undefined) =>
  `/products${typeof page === "string" ? `?page=${page}` : ""}`;
export const getProducts = (page?: string | string[] | undefined) => async () =>
  await fetch<PagedCollection<Product>>(getProductsPath(page));
const getPagePath = (path: string) =>
  `/products/page/${parsePage("products", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: products, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Product>> | undefined
  >(getProductsPath(page), getProducts(page));
  const collection = useMercure(products, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Product List</title>
        </Head>
      </div>
      <List products={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
