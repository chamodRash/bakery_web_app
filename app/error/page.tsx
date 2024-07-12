import { NextPage } from "next";
// import { useRouter } from "next/navigation";

const ErrorPage: NextPage = () => {
  // const router = useRouter();
  // const { statusCode } = router. || {};

  return (
    <div>
      {/* <h1>Error {statusCode}</h1> */}
      <p>Oops! Something went wrong.</p>
    </div>
  );
};

export default ErrorPage;
