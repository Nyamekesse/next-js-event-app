import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { DataType } from "../../shared/types";
import HomePage from "@/components/Home/home-page";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  data: Array<DataType>;
};
export default function Home({ data }: Props) {
  return (
    <>
      <Head>
        <title>Events App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage data={data} />
    </>
  );
}
export async function getServerSideProps() {
  const { events_categories } = await import("../../data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
