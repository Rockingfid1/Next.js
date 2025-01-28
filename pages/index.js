import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoadingContext } from "../store/loading-context";
import Loading from "../components/ui/Loading";

export default function HomePage(props) {
  const router = useRouter();
  const { handleStart, handleComplete, isLoading, shouldReload, handleReload } =
    useLoadingContext();

  useEffect(() => {
    if (shouldReload) {
      router.reload();
    }

    return () => handleReload(false);
  }, [shouldReload, handleReload]);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => handleStart(url, router));
    router.events.on("routeChangeComplete", (url) =>
      handleComplete(url, router)
    );
    router.events.on("routeChangeError", (url) => handleComplete(url, router));

    return () => {
      router.events.off("routeChangeStart", (url) => handleStart(url, router));
      router.events.off("routeChangeComplete", (url) =>
        handleComplete(url, router)
      );
      router.events.off("routeChangeError", (url) =>
        handleComplete(url, router)
      );
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of higly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGO_DB_CONNECT
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: "" + meetup._id,
      })),
    },
    revalidate: 1,
  };
}

/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  // fetch data from an API
  return {
    props: { meetups: DUMMY_MEETUPS },
  };
}
*/
