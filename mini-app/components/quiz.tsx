'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import QuizResult from './quiz-result';

type Animal = 'cat' | 'dog' | 'fox' | 'hamster' | 'horse';

interface Option {
  text: string;
  animal: Animal;
}

interface Question {
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    text: 'What is your favorite type of food?',
    options: [
      { text: 'Fish', animal: 'cat' },
      { text: 'Meat', animal: 'dog' },
      { text: 'Berries', animal: 'fox' },
      { text: 'Seeds', animal: 'hamster' },
      { text: 'Grain', animal: 'horse' },
    ],
  },
  {
    text: 'How do you prefer to travel?',
    options: [
      { text: 'On a couch', animal: 'cat' },
      { text: 'On a leash', animal: 'dog' },
      { text: 'Through forests', animal: 'fox' },
      { text: 'In a cage', animal: 'hamster' },
      { text: 'On a trail', animal: 'horse' },
    ],
  },
  {
    text: 'What is your favorite activity?',
    options: [
      { text: 'Nap', animal: 'cat' },
      { text: 'Play fetch', animal: 'dog' },
      { text: 'Hunt', animal: 'fox' },
      { text: 'Run in a wheel', animal: 'hamster' },
      { text: 'Run freely', animal: 'horse' },
    ],
  },
  {
    text: 'What is your personality like?',
    options: [
      { text: 'Independent', animal: 'cat' },
      { text: 'Friendly', animal: 'dog' },
      { text: 'Clever', animal: 'fox' },
      { text: 'Curious', animal: 'hamster' },
      { text: 'Strong', animal: 'horse' },
    ],
  },
  {
    text: 'What is your favorite environment?',
    options: [
      { text: 'Indoor', animal: 'cat' },
      { text: 'Outdoor', animal: 'dog' },
      { text: 'Forest', animal: 'fox' },
      { text: 'Shelter', animal: 'hamster' },
      { text: 'Pasture', animal: 'horse' },
    ],
  },
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const initialScores: Record<Animal, number> = {
  cat: 0,
  dog: 0,
  fox: 0,
  hamster: 0,
  horse: 0,
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>(initialScores);
  const [showResult, setShowResult] = useState(false);

  const question = questions[current];
  const shuffledOptions = useMemo(() => shuffle(question.options), [current]);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScores(initialScores);
    setShowResult(false);
  };

  if (showResult) {
    return <QuizResult scores={scores} onRetake={resetQuiz} />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button key={idx} onClick={() => handleAnswer(opt.animal)} variant="outline">
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
