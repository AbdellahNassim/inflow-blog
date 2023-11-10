import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  doc,
  onSnapshot,
  CollectionReference,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { getFirestoreClientInstance } from "@/firebase/firestoreClient";
import { Comment, User } from "@/firebase/models";

export const useComments = (postSlug: string) => {
  const firestore = getFirestoreClientInstance();

  const commentsRef = collection(
    firestore,
    "comments"
  ) as CollectionReference<Comment>;
  const usersRef = collection(firestore, "users") as CollectionReference<User>;
  const onSnapshotComments = async () => {
    const queryComments = query(
      commentsRef,
      where("postSlug", "==", postSlug),
      orderBy("upvotes", "desc")
    );
    return onSnapshot(queryComments, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New comment: ", change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified comment: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed comment: ", change.doc.data());
        }
      });
    });
  };
  const createNewComment = async (
    email: string,
    comment: string,
    postSlug: string
  ) => {
    const queryUser = query(usersRef, where("email", "==", email));
    const user = (await getDocs(queryUser)).docs[0];
    if (!user) return;
    const doc = await addDoc(commentsRef, {
      email: email,
      text: comment,
      //@ts-ignore
      author: user.ref,
      postSlug,
      createdAt: serverTimestamp(),
      upvoters: [],
      upvotes: 0,
      downvoters: [],
      replies: [],
    });
    if (doc) {
      fetchComments();
    }
  };
  const upvoteComment = async (userEmail: string, commentId: string) => {
    const commentRef = doc(commentsRef, commentId);
    const commentDoc = await getDoc(commentRef);
    const comment = commentDoc.data();
    const upvoters = comment?.upvoters || [];
    const downvoters = comment?.downvoters || [];
    if (upvoters.includes(userEmail)) {
      return;
    }
    if (downvoters.includes(userEmail)) {
      downvoters.splice(downvoters.indexOf(userEmail), 1);
    }
    upvoters.push(userEmail);

    await updateDoc(commentRef, {
      upvotes: upvoters.length,
      upvoters,
      downvoters,
    });
  };
  const unupvoteComment = async (userEmail: string, commentId: string) => {
    const commentRef = doc(commentsRef, commentId);
    const commentDoc = await getDoc(commentRef);
    const comment = commentDoc.data();
    const upvoters = comment?.upvoters || [];
    if (upvoters.includes(userEmail)) {
      upvoters.splice(upvoters.indexOf(userEmail), 1);
    }
    await updateDoc(commentRef, {
      upvotes: upvoters.length,
      upvoters,
    });
  };
  const getComments = async () => {
    const queryComments = query(
      commentsRef,
      where("postSlug", "==", postSlug),
      orderBy("upvotes", "desc")
    );
    return await getDocs(queryComments);
  };
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const fetchComments = async () => {
    setLoading(true);
    const data = await getComments();
    const authors = await Promise.all(
      data.docs.map((document) => {
        const auth = doc(usersRef, String(document.data().author?.id).trim());
        return getDoc(auth);
      })
    );
    const cmts = data.docs.map((document, index) => {
      const comment = document.data() as Comment;
      const author = authors[index].data();
      return {
        id: String(document.id).trim(),
        ...comment,
        createdAt: comment.createdAt,
        upvoters: comment.upvoters || [],
        downvoters: comment.downvoters || [],
        author,
      };
    });

    setComments(cmts);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchComments();
  }, [postSlug]);

  return {
    comments,
    fetchComments,
    upvoteComment,
    onSnapshotComments,
    unupvoteComment,
    createNewComment,
    loading,
  };
};
