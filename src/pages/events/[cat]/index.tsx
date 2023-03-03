import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  PreviewData,
} from "next";

import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Data } from "../../../../shared/types";
import CatEvent from "@/components/Events/catEvent";
type Props = {
  data: Array<Data>;
  pageName: string;
};

const EventsCatPage = ({ data, pageName }: Props) => {
  return <CatEvent data={data} pageName={pageName} />;
};

export default EventsCatPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { events_categories } = await import("../../../../data/data.json");
  const allPaths = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString(),
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  const id = context?.params?.cat;
  const { allEvents } = await import("../../../../data/data.json");
  const data = allEvents.filter((event) => event.city === id);
  return { props: { data, pageName: id } };
};
