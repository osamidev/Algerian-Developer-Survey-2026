import { pool } from "./queries.js";
import fs from "fs";

async function run() {
  try {
    const questionsRes = await pool.query('SELECT id, question as text, type, "order" as position FROM questions WHERE survey_id = 1 ORDER BY "order"');
    const optionsRes = await pool.query('SELECT id, question_id, option_text as text, "order" as position FROM options ORDER BY "order"');
    const depsRes = await pool.query('SELECT target_question_id as question_id, source_option_id as depends_on_option_id, condition_type FROM questions_depedencies');

    const optionsMap = {};
    optionsRes.rows.forEach(opt => {
      if (!optionsMap[opt.question_id]) optionsMap[opt.question_id] = [];
      optionsMap[opt.question_id].push({ id: opt.id, text: opt.text });
    });

    const depsMap = {};
    depsRes.rows.forEach(dep => {
      if (!depsMap[dep.question_id]) depsMap[dep.question_id] = [];
      if (dep.depends_on_option_id !== null) {
        depsMap[dep.question_id].push(dep.depends_on_option_id);
      }
    });

    const result = questionsRes.rows.map(q => ({
      id: q.id,
      text: q.text,
      type: q.type,
      options: optionsMap[q.id] || [],
      depends_on_options: depsMap[q.id] || []
    }));

    fs.writeFileSync("questions.json", JSON.stringify(result, null, 2));
    console.log("Successfully generated questions.json");
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
run();
