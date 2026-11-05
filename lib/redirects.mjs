// 301 redirects. Add old URLs here when migrating from a previous site.
// Explicit 301 status codes for legacy URLs.
const redirects = [
  { source: "/about-us", destination: "/about", statusCode: 301 },
  { source: "/contact-us", destination: "/contact", statusCode: 301 },
  { source: "/book", destination: "/book-consultation", statusCode: 301 },
  { source: "/knowledge-centre", destination: "/blog", statusCode: 301 },
];
export default redirects;
