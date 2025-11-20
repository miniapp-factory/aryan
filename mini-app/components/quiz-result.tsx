'use client';

import { Button } from '@/components/ui/button';
import { Share } from '@/components/share';
import { url } from '@/lib/metadata';

type Animal = 'cat' | 'dog' | 'fox' | 'hamster' | 'horse';

interface QuizResultProps {
  scores: Record<Animal, number>;
  onRetake: () => void;
}

export default function QuizResult({ scores, onRetake }: QuizResultProps) {
  const winner = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as Animal;

  const imageMap: Record<Animal, string> = {
    cat: '/cat.png',
    dog: '/dog.png',
    fox: '/fox.png',
    hamster: '/hamster.png',
    horse: '/horse.png',
  };

  const altMap: Record<Animal, string> = {
    cat: 'Cat',
    dog: 'Dog',
    fox: 'Fox',
    hamster: 'Hamster',
    horse: 'Horse',
  };

  const shareText = `I am a ${winner}! ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">You are a {winner}!</h2>
      <img
        src={imageMap[winner]}
        alt={altMap[winner]}
        width={256}
        height={256}
        className="rounded-md"
      />
      <div className="flex gap-2">
        <Share text={shareText} />
        <Button onClick={onRetake}>Retake Quiz</Button>
      </div>
    </div>
  );
}
