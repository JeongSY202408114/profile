// 전체 조회
// 실행: node sample_get1.js
const { db, createApp, asyncHandler, integer, subjectName, start } = require("./sample_common");
const app = createApp();

app.get("/", asyncHandler(async (req, res) => {
  const [menus] = await db.execute("SELECT id, name, price, category FROM menus ORDER BY id DESC");
  res.render("cafe_menu", { menus });
}));

start(app, "GET 1: 전체 조회");
