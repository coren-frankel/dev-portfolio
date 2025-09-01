import { Card, Image, Skeleton, Space, Typography, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons";

interface SkillCardProps {
  skill: {
    id: string;
    title: string;
    description: string;
    iconUrl: string;
    altText: string;
    previewMask: string;
    perlineConfig: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
  };
  imageLoading: boolean;
  onImageLoad: () => void;
  onImageLoadStart: () => void;
  getResponsiveValue: (mobile: any, tablet: any, desktop: any) => any;
  getSkillIconUrl: (skill: any) => string;
}

export function SkillCard({
  skill,
  imageLoading,
  onImageLoad,
  onImageLoadStart,
  getResponsiveValue,
  getSkillIconUrl,
}: SkillCardProps) {
  return (
    <Col xs={24} sm={24} md={8} lg={8}>
      <Card
        style={{
          maxWidth: getResponsiveValue("100%", "400px", "400px"),
          padding: getResponsiveValue("5px", "8px", "10px"),
          width: "100%",
          backgroundColor: "hsl(270, 100%, 94%)",
        }}
        hoverable
        loading={imageLoading}
        cover={
          imageLoading ? (
            <Skeleton.Image
              active
              style={{ height: getResponsiveValue("80px", "90px", "100px") }}
            />
          ) : (
            <Image
              style={{ height: getResponsiveValue("80px", "90px", "100px") }}
              src={getSkillIconUrl(skill)}
              alt={skill.altText}
              onLoad={onImageLoad}
              onLoadStart={onImageLoadStart}
              onClick={(e) => e.stopPropagation()}
              preview={{
                mask: (
                  <Space>
                    <EyeOutlined />
                    <span>{skill.previewMask}</span>
                  </Space>
                ),
              }}
            />
          )
        }
      >
        <Card.Meta
          title={
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                fontSize: getResponsiveValue("16px", "18px", "20px"),
              }}
            >
              {skill.title}
            </Typography.Title>
          }
          description={
            <Typography.Paragraph
              style={{
                fontSize: getResponsiveValue("12px", "13px", "14px"),
                margin: 0,
              }}
            >
              {skill.description}
            </Typography.Paragraph>
          }
        />
      </Card>
    </Col>
  );
}
