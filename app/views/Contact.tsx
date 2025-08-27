import { ContactForm } from "../components/ContactForm";

const Contact = () => {
  return (
    <div
      style={{
        padding: "48px 24px",
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ContactForm />
    </div>
  );
};

export default Contact;
