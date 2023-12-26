import { Helmet } from "react-helmet";

const PageHeader = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link
        rel="shortcut icon"
        href="https://cdn-icons-png.flaticon.com/512/2926/2926754.png"
        type="image/x-icon"
      />
    </Helmet>
  );
};

export default PageHeader;
