// 과목 수정
// 실행: node sample_post2.js
const { db, createApp, asyncHandler, integer, subjectName, start } = require("./sample_common");
const app = createApp();

app.get("/", asyncHandler(async (req, res) => {
  const [menus] = await db.execute("SELECT id, name, price, category FROM menus ORDER BY id DESC");
  res.render("cafe_post2", { menus });
}));
app.post("/menus", asyncHandler(async (req, res) => {
  const id = integer(req.body.id);
  const name = subjectName(req.body.name);
  const price = integer(req.body.price);
  const category = subjectName(req.body.category);
  if (id === null || id <= 0 || !name || [...name].length > 100 || price === null || price < 0 || price > 2147483647 || !category || [...category].length > 100) {
    return res.status(400).render("sample_error", { message: "입력값 또는 대상 ID를 확인하세요." });
  }
  const [result] = await db.execute("UPDATE menus SET name = ?, price = ?, category =? WHERE id = ?", [name, price, category, id]);
  if (result.affectedRows === 0) return res.status(404).render("sample_error", { message: "입력값 또는 대상 ID를 확인하세요." });
  // POST ?? ? GET?? ???? ????? ?? ?? ??? ????.
  res.redirect(303, "/");
}));

// 메뉴 삭제
app.post("/menus/delete", asyncHandler(async (req, res) => {
  const id = integer(req.body.id);

  if (id === null || id <= 0) {
    return res.status(400).render("sample_error", {
      message: "삭제할 메뉴 ID를 확인하세요."
    });
  }

  const [result] = await db.execute(
    "DELETE FROM menus WHERE id = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).render("sample_error", {
      message: "삭제할 메뉴가 없습니다."
    });
  }

  res.redirect(303, "/");
}));

start(app, "카페 메뉴 수정 및 삭제");
