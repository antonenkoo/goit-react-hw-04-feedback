import { useState, useEffect, useRef } from 'react';
import styles from './feedback.module.scss';

export default function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positivePercent, setPositivePercent] = useState(0);

  const onClick = feedbackType => {
    switch (feedbackType) {
      case 'good':
        setGood(prevState => prevState + 1);
        setTotal(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        setTotal(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        setTotal(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setPositivePercent(((good * 100) / total).toFixed(0));
  }, [good, total]);

  return (
    <div className={styles.mainBox}>
      <h2 className={styles.title}>Please leave feedback</h2>
      <div className={styles.buttonsBlock}>
        <button
          type="button"
          onClick={() => {
            onClick('good');
          }}
        >
          Good
        </button>
        <button
          type="button"
          onClick={() => {
            onClick('neutral');
          }}
        >
          Neutral
        </button>
        <button
          type="button"
          onClick={() => {
            onClick('bad');
          }}
        >
          Bad
        </button>
      </div>
      <div className={styles.statisticsBlock}>
        <h3 className={styles.statistics}>Statistics</h3>
        <ul className={styles.statList}>
          <li className={styles.statItem}>Good: {good}</li>
          <li className={styles.statItem}>Neutral: {neutral}</li>
          <li className={styles.statItem}>Bad: {bad}</li>
          <li className={styles.statItem}>Total: {total}</li>
          <li className={styles.statItem}>
            Positive feedback: {positivePercent}%
          </li>
        </ul>
      </div>
    </div>
  );
}
