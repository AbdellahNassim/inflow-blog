// import { sendEmail } from "@/util/mail";
// import type { SendError } from "@/util/mail";
import { NextApiHandler } from "next";
import { withHCaptcha } from "next-hcaptcha";
import { firestore } from "@/firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Invalid method" });
  }

  const { name, email, message, subject } = req.body;
  //console.log(name,email,message,subject)
  if (!name || !email || !message || !subject) {
    return res.status(400).json({ error: "Missing some fields" });
  }

  try {
    const { name, email, message } = req.body; // Assuming these are the fields in your form

    // Save to Firestore
    await firestore.collection("messages").add({
      name,
      email,
      message,
      subject,
      timestamp: new Date().toISOString(),
    });
    res.redirect(302, "/contact/submissionSuccess");
  } catch (error) {
    console.error("Error saving message to Firestore", error);
    res.status(500).json({ error: "Error sending message" });
  }
  //   /// send email with sendgrid
  //   try {
  //     await sendEmail(
  //       email,
  //       `[Inflow Blog Contact] ${subject}`,
  //       `<div>
  //                 ${message}
  //             </div>`
  //     );
  //   } catch (err) {
  //     console.log((err as SendError).response);
  //     return res.redirect(400, "/contact?error=sendgrid");
  //   }
  //   res.redirect(302, "/contact/submissionSuccess");
};

export default withHCaptcha(handler, {
  envVarNames: {
    secret: "HCAPTCHA_SECRET",
  },
});
