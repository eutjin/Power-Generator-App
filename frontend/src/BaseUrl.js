const baseUrl = process.env.NODE_ENV === "production"
? "http://enerlyzr.com"
: "http://localhost:5000";
console.log("NODE ENV",process.env.NODE_ENV)
export default baseUrl;