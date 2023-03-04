import { NextApiHandler } from "next";

export const handler : NextApiHandler = async (req, res) => {
    console.log(process.env.HCAPTCHA_SECRET)
    res.send({message: "Hello World"})
}

export default handler