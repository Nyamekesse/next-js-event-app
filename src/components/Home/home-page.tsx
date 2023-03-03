import Link from "next/link";
import React from "react";
import { DataType } from "../../../shared/types";
import Image from "next/image";

type Props = {
  data: Array<DataType>;
};

const HomePage = ({ data }: Props) => {
  return (
    <div className="home_body">
      {data.map((event: DataType, index: number) => (
        <Link
          className="card"
          key={index}
          href={`/events/${event.id}`}
          passHref
        >
          <div className="image">
            <Image
              width={450}
              height={400}
              alt={event.title}
              src={event.image}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="content">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
