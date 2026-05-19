import { pool } from "./queries.js";
import fs from "fs";

async function run() {
  try {
    const questionsRes = await pool.query('SELECT * FROM questions WHERE survey_id = 1 ORDER BY "order"');
    const optionsRes = await pool.query('SELECT * FROM options ORDER BY "order"');
    const depsRes = await pool.query('SELECT * FROM questions_depedencies');

    const optionsMap = {};
    optionsRes.rows.forEach(opt => {
      if (!optionsMap[opt.question_id]) optionsMap[opt.question_id] = [];
      optionsMap[opt.question_id].push(opt);
    });

    const depsMap = {};
    depsRes.rows.forEach(dep => {
      if (!depsMap[dep.target_question_id]) depsMap[dep.target_question_id] = [];
      depsMap[dep.target_question_id].push(dep);
    });

    const result = questionsRes.rows.map(q => ({
      ...q,
      options: optionsMap[q.id] || [],
      dependencies: depsMap[q.id] || []
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
