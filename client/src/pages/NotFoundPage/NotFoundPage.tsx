import React from "react";
import Template from "../../components/Templates/MainTemplate/MainTemplate";

const NotFoundPage = () => {
  const Content = (
    <div>
      <p className="status">404</p>
      <p className="desc">페이지가 없어요🤦‍♂️</p>
    </div>
  );

  return <Template Content={Content} />;
};

export default NotFoundPage;
