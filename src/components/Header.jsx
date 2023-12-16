// To use relative path for images like that (src='/quiz-logo.png') => make sure your needed images are in public folder
// Or you can put them in assets folder and import them like that (import quizLogo from "../assets/quiz-logo.png")
export default function Header() {
  return (
    <header>
      <img src="/quiz-logo.png" alt="quiz-logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
