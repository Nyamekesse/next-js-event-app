import Image from "next/image";
import React, { FormEventHandler, LegacyRef, useRef, useState } from "react";
import { Data } from "../../../shared/types";
import { useRouter } from "next/router";

type Props = {
  eventData: Data;
};

const SingleEvent = ({ eventData }: Props) => {
  const inputEmail = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const emailValue = inputEmail.current?.value;
    const eventId = router?.query.id;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue?.match(validRegex)) {
      setMessage("Please introduce a correct email address");
    }

    try {
      // POST Fetch Request
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, eventId }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      inputEmail.current && (inputEmail.current.value = "");
      console.log("POST", data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <div className="event_single_page">
      <Image
        src={eventData.image}
        width={1000}
        height={500}
        alt={eventData.title}
      />
      <h1>{eventData.title}</h1>
      <p>{eventData.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label htmlFor="">Get Registered for this event</label>
        <input
          type="email"
          id="email"
          placeholder="please insert your email here"
          ref={inputEmail}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;
