import ContactForm from "@/components/contact/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me",
  description: "send me a message",
};

function Contact() {
  return <ContactForm />;
}

export default Contact;
