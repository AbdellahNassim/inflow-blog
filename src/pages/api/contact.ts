import { sendEmail} from "@/util/mail";
import type { SendError } from "@/util/mail";
import { NextApiHandler } from "next";
import { withHCaptcha } from "next-hcaptcha";


console.log(process.env.HCAPTCHA_SECRET)
const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({ error: 'Invalid method' });
    }

    const { name, email, message, subject } = req.body;
    //console.log(name,email,message,subject)
    if (!name || !email || !message || !subject) {
       
        return res.status(400).json({ error: 'Missing some fields' });
    }
    /// send email with sendgrid
    try {
        await sendEmail(
            email,
            `[Inflow Blog Contact] ${subject}`,
            `<div>
                ${message}
            </div>`
        );
    }catch (err) {
        console.log((err as SendError).response)
        return res.status(400).json({ error: 'Something went wrong while sending email...try later' });
    }
    res.status(200).json({ error: '' });

}

export default withHCaptcha(handler, {envVarNames : {
    secret : "HCAPTCHA_SECRET",
}})