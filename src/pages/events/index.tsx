import Link from "next/link";
import React from "react";
import Image from "next/image";
import { DataType } from "../../../shared/types";
import AllEvents from "../../components/Events/events-page";
type Props = {
  data: Array<DataType>;
};

const EventsPage = ({ data }: Props) => {
  return <AllEvents data={data} />;
};

export default EventsPage;

export async function getStaticProps() {
  const { events_categories } = await import("../../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
