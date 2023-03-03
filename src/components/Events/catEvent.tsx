import React from "react";
import { Data } from "../../../shared/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Array<Data>;
  pageName: string;
};

const CatEvent = ({ pageName, data }: Props) => {
  return (
    <div className="cat_events">
      <h1>Event in {pageName}</h1>
      <div className="content">
        {data.map((event: Data) => (
          <Link
            key={event.id}
            className="card"
            href={`/events/${event.city}/${event.id}`}
            passHref
          >
            <Image
              width={300}
              height={300}
              src={event.image}
              alt={event.title}
            />
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatEvent;
