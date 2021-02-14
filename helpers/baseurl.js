const BaseUrl = process.env.NODE_ENV === "producation" ? "https://mystorevisit.herokuapp.com/" :"http://localhost:3000";
export default BaseUrl;