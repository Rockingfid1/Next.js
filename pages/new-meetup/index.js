//domain.com/new-meetup
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useLoadingContext } from "../../store/loading-context";
import { useEffect } from "react";
import Loading from "../../components/ui/Loading";

export default function NewMeetupPage() {
  const router = useRouter();

  const { handleStart, handleComplete, isLoading, handleReload } =
    useLoadingContext();

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

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    handleReload(true);
    router.push("/");
  }

  return (
    <>
      {isLoading && <Loading />}
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing network opportunities!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
