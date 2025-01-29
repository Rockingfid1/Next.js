import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetails";
import { useRouter } from "next/router";
import { useLoadingContext } from "../../store/loading-context";
import { useEffect } from "react";
import Loading from "../../components/ui/Loading";

export default function DetailPage(props) {
  const router = useRouter();
  const { handleStart, handleComplete, isLoading } = useLoadingContext();

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
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_DB_CONNECT);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const meetupId = params.meetupId;

  const client = await MongoClient.connect(process.env.MONGO_DB_CONNECT);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId.createFromHexString(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: "" + selectedMeetup,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        title: selectedMeetup.title,
      },
    },
  };
}
