import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";

const HeaderQuestions = () => {
  const { language } = useContext(LanguageContext);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); 

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/questions/header?lang=${language}`)
      .then((response) => {
        setQuestions(response.data);
        const initialAnswers = {};
        response.data.forEach((question) => {
          initialAnswers[question.id] = "";
        });
        setAnswers(initialAnswers);
      })
      .catch((error) => {
        console.error("Error fetching header questions:", error);
      });
  }, [language]);

  const handleInputChange = (e, questionId) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted answers:", answers);
  };

  return (
    <div>
      <h1>Header Questions</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <label htmlFor={question.id}>{question.text}</label>
              {question.type === "text" && (
                <input
                  type="text"
                  id={question.id}
                  value={answers[question.id]}
                  onChange={(e) => handleInputChange(e, question.id)}
                />
              )}
              {question.type === "numeric" && (
                <input
                  type="number"
                  id={question.id}
                  value={answers[question.id]}
                  onChange={(e) => handleInputChange(e, question.id)}
                />
              )}
              {question.type === "multiple_choice" && (
                <select
                  id={question.id}
                  value={answers[question.id]}
                  onChange={(e) => handleInputChange(e, question.id)}
                >
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </li>
          ))}
        </ul>
        <button type="button">Next</button>
      </form>
    </div>
  );
};

export default HeaderQuestions;
