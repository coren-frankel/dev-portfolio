const Matrix = () => {
  return (
    // Ignore iframe complaint about sandbox to allow embedded youtube video
    // oxlint-disable
    <iframe
      width="560"
      height="315"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
      src="https://www.youtube.com/embed/6IDT3MpSCKI?si=kMcbLG6e0OUIcVCR"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default Matrix;
