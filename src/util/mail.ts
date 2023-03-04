import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const sender = process.env.SENDGRID_SENDER_EMAIL!;
export type SendError = sgMail.ResponseError
export const sendEmail = async (email: string, subject: string, html: string) => {

    const msg = {
        to: sender, // sender is same as from to receive emails in my inbox
        from: sender,
        subject,
        html: `<div>
                <p>From: ${email}</p>
                <div>
                ${html}
                </div>
            </div>`,
    };

    try {
        await sgMail.send(msg);
    } catch (error: any) {
        console.error(error);
        if ((error as sgMail.ResponseError).response) {
            console.error(error.response.body)
            throw error
        }
    }
}
