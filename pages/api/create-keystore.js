// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var user = { name: "azraq", country: "egypt" };
  var json = JSON.stringify(user);
  var filename = "user.json";
  var mimetype = "application/json";
  res.setHeader("Content-Type", mimetype);
  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.send(json);
}
