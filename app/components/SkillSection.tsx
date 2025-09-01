import { ParallaxLayer } from "@react-spring/parallax";
import { Row, Col, Image } from "antd";
import { SkillCard } from "./SkillCard";

interface SkillSectionProps {
  section: {
    offset: number;
    backgroundColor: string;
    nextSectionOffset: number;
    centerImage: string;
    skills: string[];
  };
  skillsData: any;
  imageAssets: Record<string, string>;
  imageLoading: Record<string, boolean>;
  handleImageLoad: (key: string) => void;
  handleImageLoadStart: (key: string) => void;
  getResponsiveValue: (mobile: any, tablet: any, desktop: any) => any;
  getSkillIconUrl: (skill: any) => string;
  navigateToSection: (section: number) => void;
}

export function SkillSection({
  section,
  skillsData,
  imageAssets,
  imageLoading,
  handleImageLoad,
  handleImageLoadStart,
  getResponsiveValue,
  getSkillIconUrl,
  navigateToSection,
}: SkillSectionProps) {
  const sectionSkills = section.skills
    .map((skillId) =>
      skillsData.skills.find((skill: any) => skill.id === skillId),
    )
    .filter(Boolean);

  return (
    <>
      {/* Background Layer */}
      {section.backgroundColor !== "transparent" && (
        <ParallaxLayer
          offset={section.offset}
          speed={1}
          style={{ backgroundColor: section.backgroundColor }}
        />
      )}

      {/* Content Layer */}
      <ParallaxLayer
        offset={section.offset}
        speed={0.1}
        onClick={() => navigateToSection(section.nextSectionOffset)}
        style={{
          display: "flex",
          gap: getResponsiveValue("20px", "30px", "40px"),
          flexDirection: getResponsiveValue("column", "column", "row"),
          alignItems: "center",
          justifyContent: "center",
          padding: getResponsiveValue("20px 10px", "30px 20px", "40px"),
        }}
      >
        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
          style={{ width: "100%" }}
        >
          {/* First Skill Card */}
          <SkillCard
            skill={sectionSkills[0]}
            imageLoading={imageLoading[sectionSkills[0]?.id]}
            onImageLoad={() => handleImageLoad(sectionSkills[0]?.id)}
            onImageLoadStart={() => handleImageLoadStart(sectionSkills[0]?.id)}
            getResponsiveValue={getResponsiveValue}
            getSkillIconUrl={getSkillIconUrl}
          />

          {/* Center Image */}
          <Col xs={24} sm={24} md={8} lg={8} style={{ textAlign: "center" }}>
            <Image
              preview={false}
              src={imageAssets[section.centerImage]}
              width={getResponsiveValue("60%", "80%", "20%")}
              style={{
                maxWidth: getResponsiveValue("200px", "250px", "none"),
                transition: "transform 0.3s ease",
              }}
              className="responsive-image"
            />
          </Col>

          {/* Second Skill Card */}
          <SkillCard
            skill={sectionSkills[1]}
            imageLoading={imageLoading[sectionSkills[1]?.id]}
            onImageLoad={() => handleImageLoad(sectionSkills[1]?.id)}
            onImageLoadStart={() => handleImageLoadStart(sectionSkills[1]?.id)}
            getResponsiveValue={getResponsiveValue}
            getSkillIconUrl={getSkillIconUrl}
          />
        </Row>
      </ParallaxLayer>
    </>
  );
}
