import { Pool } from "pg";
import dotenv from "dotenv";
import process from "node:process";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("DATABASE CRASHED ON STARTUP:", err.code);
  } else {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    release();
  }
});

export { pool }; // Or however you export it

async function handleGithubUser(ID) {
  const findQuery = 'SELECT * FROM "users" WHERE github_acc = $1';
  const findResult = await pool.query(findQuery, [ID]);

  if (findResult.rows.length > 0) {
    await pool.query(
      'UPDATE "users" SET last_signin_at = NOW() WHERE github_acc = $1',
      [ID],
    );
    return { ...findResult.rows[0], is_new: false };
  } else {
    const insertQuery = `
            INSERT INTO "users" (github_acc, created_at) 
            VALUES ($1, NOW())
            RETURNING *
        `;
    const insertResult = await pool.query(insertQuery, [ID]);

    return { ...insertResult.rows[0], is_new: true };
  }
}

async function hasSubmittedSurvey(userId) {
  const query =
    "SELECT EXISTS (SELECT 1 FROM answers WHERE user_id = $1) AS has_submitted";
  const result = await pool.query(query, [userId]);
  return result.rows[0]?.has_submitted ?? false;
}

async function handleGoogleUser(ID) {
  //Check if ID exists in google_acc
  const findQuery = 'SELECT * FROM "users" WHERE google_acc = $1';
  const findResult = await pool.query(findQuery, [ID]);
  if (findResult.rows.length > 0) {
    await pool.query(
      'UPDATE "users" SET last_signin_at = NOW() WHERE google_acc = $1',
      [ID],
    );
    return { ...findResult.rows[0], is_new: false };
  } else {
    //Create new user with this ID
    const insertQuery = `
            INSERT INTO "users" (google_acc, created_at) 
            VALUES ($1, NOW()) 
            RETURNING *
        `;
    const insertResult = await pool.query(insertQuery, [ID]);
    return { ...insertResult.rows[0], is_new: true };
  }
}

async function GetQuestions() {
  const SearchQue = "SELECT * FROM questions ORDER BY position";
  const GetQue = await pool.query(SearchQue);
  return GetQue.rows;
}

async function GetOptions(questionID) {
  const searchQue = "SELECT * FROM options WHERE question_id = ANY($1)";
  const GetQue = await pool.query(searchQue, [questionID]);
  return GetQue.rows;
}

async function GetDepends() {
  const GetQue = await pool.query("SELECT * FROM questions_based_on_options");
  return GetQue.rows;
}

async function SaveAnswers(user_id, answers) {
  for (const ans of answers) {
    if (ans.type === "multiple-choice") {
      for (let i = 0; i < ans.answer.length; i++) {
        await pool.query(
          `INSERT INTO answers (user_id, question_id, option_id, raw_numbers, answered_at)
                     VALUES ($1, $2, $3, $4, NOW())`,
          [user_id, ans.question_id, ans.answer[i] || null, null],
        );
      }
    } else if (ans.type === "ranking") {
      for (let i = 0; i < ans.answer.length; i++) {
        await pool.query(
          `INSERT INTO answers (user_id, question_id, option_id, raw_numbers, answered_at)
                     VALUES ($1, $2, $3, $4, NOW())`,
          [user_id, ans.question_id, ans.answer[i], i + 1], // raw num contain the ranking order
        );
      }
    } else if (ans.type === "numeric") {
      await pool.query(
        `INSERT INTO answers (user_id, question_id, option_id, raw_numbers, answered_at)
                 VALUES ($1, $2, $3, $4, NOW())`,
        [user_id, ans.question_id, null, ans.answer],
      );
    } else {
      await pool.query(
        `INSERT INTO answers (user_id, question_id, option_id, raw_numbers, answered_at)
                 VALUES ($1, $2, $3, $4, NOW())`,
        [user_id, ans.question_id, ans.answer || null, null],
      );
    }
  }
}

export {
  handleGithubUser,
  handleGoogleUser,
  GetQuestions,
  GetOptions,
  SaveAnswers,
  GetDepends,
  hasSubmittedSurvey,
};
