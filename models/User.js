import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const wh = new Webhook(process.env.SIGNING_SECRET);

    const headerPayload = headers(); // ✅ no 'await'
    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id"),
      "svix-timestamp": headerPayload.get("svix-timestamp"),
      "svix-signature": headerPayload.get("svix-signature"),
    };

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const { data, type } = wh.verify(body, svixHeaders);

    // ✅ Format user data from Clerk webhook
    const userData = {
  _id: data.id,
  name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
  email: data.email_addresses?.[0]?.email_address || "no-email@placeholder.com",
  image: data.image_url || "",
};


    await connectDB();

    // ✅ Handle different event types
    switch (type) {
      case "user.created":
        console.log("Creating user:", userData);
        await User.create(userData);
        break;

      case "user.updated":
        console.log("Updating user:", userData);
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        console.log("Deleting user:", data.id);
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log("Unhandled event type:", type);
        break;
    }

    return new Response(JSON.stringify({ message: "Event received" }), { status: 200 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), { status: 500 });
  }
}
