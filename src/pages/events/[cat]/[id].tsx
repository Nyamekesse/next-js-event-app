import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Data } from "../../../../shared/types";
import SingleEvent from "@/components/Events/single-event";

type Props = {
  eventData: Data;
};

const EventPage = ({ eventData }: Props) => {
  return <SingleEvent eventData={eventData} />;
};

export default EventPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { allEvents } = await import("../../../../data/data.json");
  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
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
  const id = context?.params?.id;
  const { allEvents } = await import("../../../../data/data.json");
  const eventData = allEvents.find((event) => id === event.id);
  return { props: { eventData } };
};
