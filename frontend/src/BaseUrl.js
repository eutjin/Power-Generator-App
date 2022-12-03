const baseUrl = process.env.NODE_ENV === "production"
? "https://enerlyzr.com"
: "http://localhost:5000";
export default baseUrl;