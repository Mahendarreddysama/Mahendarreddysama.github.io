"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Share2, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/content/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const rating = (score) => [
  "Begin Your Prime Journey 🎥",
  "Time for a Rewatch 📽",
  "Keep Watching 🍿",
  "Movie Enthusiast 🎬",
  "Super Fan ⭐",
  "Ultimate Prime Fan 🏆",
][score];

export default function QuizExperience({ quiz }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState(0);
  const question = quiz.questions[index];
  const contactUrl = createWhatsAppUrl(
    siteConfig.whatsapp,
    `Hello PrimeShow Entertainment, I have a question about the ${quiz.movie} quiz.`,
  );
  const shareUrl = createWhatsAppUrl(
    siteConfig.whatsapp,
    `I scored ${score}/5 on the ${quiz.movie} PrimeShow quiz.`,
  );

  useEffect(() => {
    const timer = window.setTimeout(
      () => setBest(Number(localStorage.getItem(`prime-quiz-${quiz.slug}`) || 0)),
      0,
    );
    return () => window.clearTimeout(timer);
  }, [quiz.slug]);

  const choose = (choice) => {
    if (answer !== null) return;
    setAnswer(choice);
    if (choice === question.correct) setScore((current) => current + 1);
  };

  const next = () => {
    if (index === quiz.questions.length - 1) {
      setDone(true);
      const high = Math.max(best, score);
      setBest(high);
      localStorage.setItem(`prime-quiz-${quiz.slug}`, String(high));
    } else {
      setIndex((current) => current + 1);
      setAnswer(null);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setAnswer(null);
    setDone(false);
  };

  return (
    <main id="main-content" className="quiz-experience">
      <header className="quiz-top">
        <Link href="/prime-hub#quizzes"><ArrowLeft /> Primeverse</Link>
        <span>{quiz.movie} Quiz</span>
        <div className="quiz-top-meta">
          <a href={contactUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp aria-hidden="true" /> +91 78429 85404
          </a>
          <small>Best {best}/5</small>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.section
            key={index}
            className="quiz-screen"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 }}
            transition={{ duration: 0.4 }}
          >
            <div className="quiz-question-meta">
              <span>Question {index + 1} of {quiz.questions.length}</span>
              <strong>{Math.round(((index + 1) / quiz.questions.length) * 100)}%</strong>
            </div>
            <div className="quiz-progress">
              <i style={{ width: `${((index + 1) / quiz.questions.length) * 100}%` }} />
            </div>
            <h1>{question.question}</h1>
            <div className="answer-grid">
              {question.options.map((option, choice) => {
                const selected = answer === choice;
                const correct = answer !== null && choice === question.correct;
                const wrong = selected && choice !== question.correct;
                return (
                  <button
                    key={option}
                    disabled={answer !== null}
                    className={`${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                    onClick={() => choose(choice)}
                  >
                    <span>{String.fromCharCode(65 + choice)}</span>
                    <strong>{option}</strong>
                    {correct && <Check />}
                    {wrong && <X />}
                  </button>
                );
              })}
            </div>
            {answer !== null && (
              <motion.button
                className="button button-gold quiz-next"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={next}
              >
                {index === quiz.questions.length - 1 ? "See my result" : "Next question"}
                <ArrowRight />
              </motion.button>
            )}
          </motion.section>
        ) : (
          <motion.section
            className={`quiz-result ${score === 5 ? "perfect" : ""}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="eyebrow">Quiz complete</div>
            <div className="result-score"><strong>{score}</strong><span>/ 5</span></div>
            <h1>{rating(score)}</h1>
            <p>Your highest score on this device is {best}/5.</p>
            <div className="result-actions">
              <button className="button button-gold" onClick={reset}><RotateCcw /> Try Again</button>
              <Link className="button button-glass" href="/prime-hub#quizzes">
                Another Quiz <ArrowRight />
              </Link>
              <a className="button button-line" href={shareUrl} target="_blank" rel="noopener noreferrer">
                <Share2 /> Share on WhatsApp
              </a>
            </div>
            {score === 5 && (
              <div className="confetti" aria-hidden="true">
                {Array.from({ length: 24 }, (_, confettiIndex) => (
                  <i key={confettiIndex} style={{ "--i": confettiIndex }} />
                ))}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
