import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    console.log("🚨 Webhook received");

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const headerPayload = headers(); // ✅ no await
    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id"),
      "svix-timestamp": headerPayload.get("svix-timestamp"),
      "svix-signature": headerPayload.get("svix-signature"),
    };

    console.log("✅ Headers received:", svixHeaders);

    // VERIFY SVIX SIGNATURE
    const wh = new Webhook(process.env.SIGNING_SECRET);
    const { data, type } = wh.verify(body, svixHeaders);
    console.log("📦 Verified webhook type:", type);
    console.log("👤 User data:", data);

    const userData = {
      _id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses?.[0]?.email_address || "no-email",
      image: data.image_url || "",
    };

    await connectDB();
    console.log("🛢️ MongoDB Connected");

    switch (type) {
      case "user.created":
        console.log("📥 Creating user:", userData);
        try {
          const newUser = await User.create(userData);
          console.log("✅ User created:", newUser);
        } catch (err) {
          console.error("❌ Mongoose create error:", err);
        }
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log("ℹ️ Unhandled event type:", type);
        break;
    }

    return new Response(JSON.stringify({ message: "Webhook received" }), { status: 200 });
  } catch (error) {
    console.error("❌ Webhook handler failed:", error);
    return new Response(JSON.stringify({ error: "Webhook failed", details: error.message }), { status: 500 });
  }
}
