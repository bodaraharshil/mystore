const BaseUrl = process.env.NODE_ENV === "producation" ? "https://mystore.vercel.app" :"http://localhost:3000";
export default BaseUrl;