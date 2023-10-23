import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://geraldib:sk8terboi@nexteventdb.vzwvubs.mongodb.net/?retryWrites=true&w=majority"
  );
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body.commentData;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !text ||
      !text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;
    client.close();
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const comments = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    console.log(comments);
    client.close();
    res.status(200).json({ comments: comments });
  }
};

export default handler;
