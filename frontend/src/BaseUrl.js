const baseUrl = process.env.NODE_ENV === "production"
? "https://enerlyzr.com"
: "http://localhost:5000";
console.log("NODE ENV",process.env.NODE_ENV)
export default baseUrl;