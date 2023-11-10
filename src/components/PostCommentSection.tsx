"use client";
import { useComments } from "@/hooks/useComments";
import React from "react";
import { Comment, User, Upvote } from "@/firebase/models";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import {
  ArrowRightOnRectangleIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpOutlineIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
type Props = {
  slug: string;
};
interface CommentProps {
  comment: Comment;
  isUpvoted: boolean;
  onUpvote: (commentId: string) => void;
  onUnupvote: (commentId: string) => void;
}

const Comment = ({
  comment,
  onUpvote,
  onUnupvote,
  isUpvoted,
}: CommentProps) => {
  const [upvoted, setUpvoted] = React.useState<boolean>(isUpvoted ?? false);
  const [upvotes, setUpvotes] = React.useState<number>(comment.upvotes);
  return (
    <div className="flex w-full rounded-lg bg-slate-50 p-2 drop-shadow-sm">
      <div>
        <Image
          src={comment.author?.image || "/images/default-user.png"}
          alt={comment.author?.name || "User"}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="ml-4 flex w-full items-center justify-between">
        <div>
          <p className="font-bold">{comment.author?.name}</p>
          <p>{comment.text}</p>
          <div className="flex items-center gap-2 font-semibold">
            <span>{upvotes}</span>{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (upvoted) {
                  onUnupvote(comment.id);
                  setUpvoted(false);
                  setUpvotes(upvotes - 1);
                } else {
                  onUpvote(comment.id);
                  setUpvoted(true);
                  setUpvotes(upvotes + 1);
                }
              }}
              className="text-[#E7E247]"
            >
              {upvoted ? (
                <HandThumbUpIcon className="w-4" />
              ) : (
                <HandThumbUpOutlineIcon className="w-4" />
              )}
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-400">
            {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const Comments = ({ slug, session }: { slug: string; session: Session }) => {
  const {
    comments,
    loading: loadingComments,
    upvoteComment,
    unupvoteComment,
    createNewComment,
  } = useComments(slug);
  const { register, handleSubmit } = useForm<{ newComment: string }>();
  if (loadingComments)
    return (
      <div
        className="mt-4 grid w-full place-items-center rounded-xl bg-slate-200 p-6 font-bold"
        style={{ minHeight: "30vh" }}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl">Loading comments ...</p>
        </div>
      </div>
    );

  return (
    <>
      <div className="my-2 flex flex-col gap-4">
        {comments.map((comment) => {
          return (
            <Comment
              isUpvoted={comment.upvoters.includes(session.user?.email!)}
              onUpvote={(id) => upvoteComment(session.user?.email!, id)}
              onUnupvote={(id) => unupvoteComment(session.user?.email!, id)}
              key={comment.id + comment.createdAt}
              comment={comment}
            />
          );
        })}
      </div>
      <form
        className="flex w-full items-center rounded-lg bg-opacity-40 p-4 drop-shadow-sm backdrop-blur-md"
        onSubmit={handleSubmit((data) => {
          const { newComment } = data;
          if (!newComment) return;

          createNewComment(session.user?.email!, newComment, slug);
        })}
      >
        <div>
          <Image
            src={session.user?.image || "/images/default-user.png"}
            alt={session.user?.name || "User"}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="relative ml-4 w-full">
          <p className="mb-2 ml-2 font-bold">{session.user?.name}</p>
          <input
            {...register("newComment")}
            type="text"
            className="w-full rounded-3xl px-4 py-2 shadow-sm outline-transparent  transition-all duration-200 ease-in focus:outline-[#E7E247]"
          />
          <button
            type="submit"
            className="absolute right-4 top-10 text-slate-700"
          >
            <PaperAirplaneIcon className="w-6" />
          </button>
        </div>
      </form>
    </>
  );
};

function PostCommentSection({ slug }: Props) {
  const { data: session } = useSession();
  return (
    <section id="#comments">
      <hr
        className="my-4 rounded-xl bg-slate-900 opacity-20"
        style={{ height: 4 }}
      />
      {session ? (
        <Comments session={session} slug={slug} />
      ) : (
        <div
          className="mt-4 grid w-full place-items-center rounded-xl bg-slate-200 p-6 font-bold"
          style={{ minHeight: "30vh" }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-2xl">You need to be logged in to comment</p>
            <button
              className="flex items-center gap-2 rounded-lg bg-[#E7E247] px-6 py-2 text-slate-900"
              onClick={() => signIn()}
            >
              Sign in <ArrowRightOnRectangleIcon className="w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default PostCommentSection;
