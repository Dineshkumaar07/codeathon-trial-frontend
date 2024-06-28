import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";

const TiresQuestions = () => {
  const { language } = useContext(LanguageContext);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); 
  const [imageFiles, setImageFiles] = useState({}); 

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/questions/tires?lang=${language}`)
      .then((response) => {
        setQuestions(response.data);
        const initialAnswers = {};
        response.data.forEach((question) => {
          initialAnswers[question.id] = "";
        });
        setAnswers(initialAnswers);
      })
      .catch((error) => {
        console.error("Error fetching tires questions:", error);
      });
  }, [language]);

  const handleInputChange = (e, questionId) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleImageChange = (e, questionId) => {
    const file = e.target.files[0];
    setImageFiles((prevImages) => ({
      ...prevImages,
      [questionId]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(answers).forEach((questionId) => {
      formData.append(questionId, answers[questionId]);
    });
    Object.keys(imageFiles).forEach((questionId) => {
      formData.append(`${questionId}_image`, imageFiles[questionId]);
    });

        console.log("Submitted answers and image files:", formData);
  };

  return (
    <div>
      <h1>Tires Questions</h1>
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
              {question.type === "image_upload" && (
                <input
                  type="file"
                  id={question.id}
                  onChange={(e) => handleImageChange(e, question.id)}
                />
              )}
            </li>
          ))}
        </ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TiresQuestions;
