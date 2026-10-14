import { useState, useCallback, useEffect } from 'react';
import Navbar, { type Page } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import GameModal from '@/components/GameModal';
import Home from '@/pages/Home';
import Games from '@/pages/Games';
import Leaderboard from '@/pages/Leaderboard';
import About from '@/pages/About';
import { getGame, type GameId } from '@/lib/games';
import TicTacToe from '@/games/TicTacToe';
import RockPaperScissors from '@/games/RockPaperScissors';
import NumberGuessing from '@/games/NumberGuessing';
import MemoryMatch from '@/games/MemoryMatch';
import QuizChallenge from '@/games/QuizChallenge';
import SnakeGame from '@/games/SnakeGame';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openGame = useCallback((gameId: GameId) => {
    setActiveGame(gameId);
  }, []);

  const closeGame = useCallback(() => {
    setActiveGame(null);
  }, []);

  const gameMeta = activeGame ? getGame(activeGame) : null;

  const renderGame = () => {
    switch (activeGame) {
      case 'tic_tac_toe':
        return <TicTacToe />;
      case 'rock_paper_scissors':
        return <RockPaperScissors />;
      case 'number_guessing':
        return <NumberGuessing />;
      case 'memory_match':
        return <MemoryMatch />;
      case 'quiz_challenge':
        return <QuizChallenge />;
      case 'snake':
        return <SnakeGame />;
      default:
        return null;
    }
  };

  useEffect(() => {
    document.title = page === 'home'
      ? 'Mini Games World'
      : `${page.charAt(0).toUpperCase() + page.slice(1)} | Mini Games World`;
  }, [page]);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar currentPage={page} onNavigate={navigate} />

      <main className="flex-1">
        {page === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <Home onNavigate={navigate} onPlay={openGame} />
          </>
        )}
        {page === 'games' && <Games onPlay={openGame} />}
        {page === 'leaderboard' && <Leaderboard />}
        {page === 'about' && <About />}
      </main>

      <Footer onNavigate={navigate} />

      {gameMeta && (
        <GameModal
          title={gameMeta.title}
          subtitle={gameMeta.tagline}
          onClose={closeGame}
          accentColor={gameMeta.color}
        >
          {renderGame()}
        </GameModal>
      )}
    </div>
  );
}
