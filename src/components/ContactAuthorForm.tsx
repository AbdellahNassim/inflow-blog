"use client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import validator from "validator";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
type Props = {};

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactAuthorForm({}: Props) {
  const { data: session } = useSession();
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });
  useEffect(() => {
    setValue("name", session?.user?.name || "");
    setValue("email", session?.user?.email || "");
  }, [session]);
  const handleEmailValidation = (email: string) => validator.isEmail(email);
  return (
    <div className="mx-auto my-10 max-w-3xl px-4">
      <form
        className="flex flex-col space-y-4"
        method="POST"
        action="/api/contact"
      >
        <div className="relative flex flex-col space-y-2">
          <label
            className="absolute -top-1 left-3 z-10 border-x-4 border-white bg-white focus:text-[#E7E247]"
            htmlFor="name"
          >
            Name
          </label>
          <input
            placeholder="Joe Smith"
            type="text"
            {...register("name", {
              required: { value: true, message: "You must specify your name" },
            })}
            className="rounded-md border-2 border-gray-300  p-2 transition-colors duration-200 ease-in hover:outline-[#E7E247] focus:border-[#E7E247] focus:outline-[#E7E247]"
          />
          <ErrorMessage
            errors={errors}
            name="name"
            message="You must specify your name"
            render={({ message }) => (
              <p className="text-xs font-bold text-red-500">{message}</p>
            )}
          />
        </div>
        <div className="relative flex flex-col space-y-2">
          <label
            className="absolute -top-1 left-3 z-10 border-x-4 border-white bg-white focus:text-[#E7E247]"
            htmlFor="name"
          >
            Email
          </label>
          <input
            placeholder="ex: joe@email.com"
            type="email"
            {...register("email", {
              validate: handleEmailValidation,
              required: {
                value: true,
                message: "You must specify a valid email",
              },
            })}
            className="rounded-md border-2 border-gray-300  p-2 transition-colors duration-200 ease-in hover:outline-[#E7E247] focus:border-[#E7E247] focus:outline-[#E7E247]"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            message="You must specify a valid email"
            render={({ message }) => (
              <p className="text-xs  font-bold text-red-500">{message}</p>
            )}
          />
        </div>
        <div className="relative flex flex-col space-y-2">
          <label
            className="absolute -top-1 left-3 z-10 border-x-4 border-white bg-white focus:text-[#E7E247]"
            htmlFor="name"
          >
            Subject
          </label>
          <input
            {...register("subject", {
              required: { value: true, message: "Subject is required" },
            })}
            placeholder="Contribution to Inflow, Freelance work, suggestions..."
            type="text"
            className="rounded-md  border-2 border-gray-300  p-2 transition-colors duration-200 ease-in hover:outline-[#E7E247] focus:border-[#E7E247] focus:outline-[#E7E247]"
          />
          <ErrorMessage
            errors={errors}
            name="subject"
            message="You must specify a subject"
            render={({ message }) => (
              <p className="text-xs font-bold text-red-500">{message}</p>
            )}
          />
        </div>
        <div className="relative flex flex-col space-y-2">
          <label
            className="absolute -top-1 left-3 z-10 border-x-4 border-white bg-white focus:text-[#E7E247]"
            htmlFor="name"
          >
            Message
          </label>
          <textarea
            {...register("message", {
              required: { value: true, message: "Message is required" },
            })}
            placeholder="Enter your message"
            rows={10}
            className="rounded-md border-2 border-gray-300 p-2 transition-colors duration-200 ease-in hover:outline-[#E7E247] focus:border-[#E7E247] focus:outline-[#E7E247]"
          />
          <ErrorMessage
            errors={errors}
            name="message"
            message="You must specify a message"
            render={({ message }) => (
              <p className="text-xs font-bold text-red-500">{message}</p>
            )}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
          className="h-captcha"
          data-sitekey={`${process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}`}
        >
          <button
            type="submit"
            className="flex w-min items-center rounded-md bg-[#E7E247]  p-2 text-black transition-colors duration-200 ease-in hover:bg-[#E7E247] hover:text-white"
          >
            <span>Send</span> <ArrowUpRightIcon width={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactAuthorForm;
