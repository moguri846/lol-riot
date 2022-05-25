import Head from "next/head";

const Seo = ({ title, socialtitle, socialDesc, socialUrl }) => {
  return (
    <Head>
      <title>{title} - Search My Name</title>
      <meta property="og:title" content={`${socialtitle} - Search My Name`} />
      <meta property="og:description" content={socialDesc} />
      <meta property="og:url" content={`https://searchmyname.vercel.app${socialUrl}`} />
      <meta property="twitter:title" content={socialtitle} />
      <meta property="twitter:description" content={socialDesc} />
      <meta property="twitter:url" content={`https://searchmyname.vercel.app${socialUrl}`} />
    </Head>
  );
};

export default Seo;
