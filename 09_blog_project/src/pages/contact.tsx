import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";

function Contact() {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="send me a message" />
      </Head>
      <ContactForm />
    </>
  );
}

export default Contact;
