import Head from "next/head";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title} - Search My Name</title>
    </Head>
  );
};

export default Seo;
