import Error from "../components/ui/Error-copy";

export default function ServerError() {
  return (
    <Error
      title="An error has occurred."
      message="There was an error fetching that page from the server... Please try again later."
    />
  );
}
