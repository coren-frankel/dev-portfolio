import { Button, Card, Result } from "antd";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        minHeight: "100%",
      }}
    >
      <Card style={{ maxWidth: "500px", textAlign: "center" }}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Back Home
            </Button>
          }
        />
      </Card>
    </Layout>
  );
};

export default NotFound;
