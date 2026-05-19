import dotenv from "dotenv";
import process from "node:process";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  handleGithubUser,
  handleGoogleUser,
  GetQuestions,
  GetOptions,
  SaveAnswers,
  GetDepends,
  hasSubmittedSurvey,
} from "./queries.js";

dotenv.config();

const app = express();
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

function createSessionToken(session) {
  return jwt.sign(session, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function readSessionCookie(req) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const index = entry.indexOf("=");
        if (index === -1) return [entry, ""];
        return [
          entry.slice(0, index),
          decodeURIComponent(entry.slice(index + 1)),
        ];
      }),
  );

  return cookies.survey_session || null;
}

async function buildSessionPayload({ provider, userProfile, userRow, isNew }) {
  const userId = userRow.user_id;
  const alreadySubmitted = await hasSubmittedSurvey(userId);

  return {
    user_id: userId,
    did_user_submit: alreadySubmitted,
    avatar_image: userProfile.avatar_url || userProfile.picture || null,
    provider,
    is_new: isNew,
  };
}

app.get("/about", (req, res) => {
  res.status(200);
});

// 1. THE CALLBACK ROUTE
app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("Auth code missing");

  try {
    // Exchange code for Access Token
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      },
    );
    const tokenData = await tokenRes.json();

    // Get User Info from GitHub
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "NodeApp",
      },
    });
    const githubUser = await userRes.json();

    // Save/Update in our Supabase DB
    const intsertUser = await handleGithubUser(githubUser.id);
    const sessionPayload = await buildSessionPayload({
      provider: "github",
      userProfile: githubUser,
      userRow: intsertUser,
      isNew: intsertUser.is_new,
    });
    const sessionToken = createSessionToken(sessionPayload);

    res.cookie("survey_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${FRONTEND_URL}/survey?session=${sessionToken}`);
  } catch (error) {
    console.error("Critical Auth Failure:", error.message);
    res.redirect(`${FRONTEND_URL}/index.html?status=error`);
  }
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Missing Code");
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: `${BACKEND_URL}/auth/google/callback`,
      }),
    });

    const tokenData = await tokenRes.json();

    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );

    const googleUser = await userRes.json();

    const intsertUser = await handleGoogleUser(googleUser.sub);
    const sessionPayload = await buildSessionPayload({
      provider: "google",
      userProfile: googleUser,
      userRow: intsertUser,
      isNew: intsertUser.is_new,
    });
    const sessionToken = createSessionToken(sessionPayload);

    res.cookie("survey_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${FRONTEND_URL}/survey?session=${sessionToken}`);
  } catch (err) {
    console.error(`Login Failed: ${err.message}`);
    return res.status(500).send("Login Failed");
  }
});

app.get("/auth/session", async (req, res) => {
  const token = req.query.session || readSessionCookie(req);

  if (!token) {
    return res.status(401).json({ success: false, message: "Session missing" });
  }

  try {
    const session = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      session,
    });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid session" });
  }
});

app.post("/auth/logout", (req, res) => {
  // Clear the cookie by setting maxAge: 0 or using clearCookie
  res.clearCookie("survey_session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ success: true, message: "Logged out" });
});

app.get("/survey/:surveyId/questions", async (req, res) => {
  try {
    const surveyId = req.params.surveyId;
    const questions = await GetQuestions(surveyId);
    
    if (!questions || questions.length === 0) {
      return res.json({ questions: [], options: {}, DependsRows: [] });
    }

    const optionsRows = await GetOptions(questions.map((q) => q.question_id));
    const DependsRows = await GetDepends();

    const options = {};

    optionsRows.forEach((opt) => {
      if (!options[opt.question_id]) {
        options[opt.question_id] = [];
      }
      options[opt.question_id].push(opt);
    });

    res.json({ questions, options, DependsRows });
  } catch (error) {
    console.error("Failed to fetch:", error.message);
    res.status(500).send("failed to fetch");
  }
});

app.post("/survey/:surveyId/answers", async (req, res) => {
  try {
    const answer = req.body;
    await SaveAnswers(answer.user_id, answer.answers);
    res.status(200).send({
      success: true,
      message: "Answers submitted successfully",
    });
  } catch (error) {
    console.error("Failed to post:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to submit answers",
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Main App running on port ${PORT}`));
