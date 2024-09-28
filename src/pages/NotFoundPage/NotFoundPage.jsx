import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={s.main}>
      <h1 className={s.title}>Looks like this page is unavailable...</h1>
      <Link to="/" className={s.link}>
        Go home
      </Link>
    </main>
  );
}
