const CHALLENGES_BY_STOP = {
  1: {
    country: 'France',
    title: 'Cafe Charades',
    prompt: 'Act out ordering the fanciest drink in Paris without using words.',
    penalty: 'If your team cannot guess it in 20 seconds, take 1 sip.',
    accent: '#d71920',
  },
  2: {
    country: 'Spain',
    title: 'Tapas Tempo',
    prompt: 'Name three tapas dishes before the other team counts down from five.',
    penalty: 'Miss one? Tell a travel story or take 1 sip.',
    accent: '#f2c94c',
  },
  3: {
    country: 'Portugal',
    title: 'Fado Face-Off',
    prompt: 'Give your most dramatic 5-second performance about missing the last train.',
    penalty: 'No drama, no glory: take 1 sip.',
    accent: '#27ae60',
  },
  4: {
    country: 'Spain',
    title: 'Flamenco Freeze',
    prompt: 'Strike a flamenco pose. Your team must copy it perfectly.',
    penalty: 'Worst pose takes 1 sip.',
    accent: '#eb5757',
  },
  5: {
    country: 'Italy',
    title: 'Pasta Pitch',
    prompt: 'Invent a pasta dish and sell it like a luxury commercial.',
    penalty: 'If nobody would order it, take 1 sip.',
    accent: '#2f80ed',
  },
  6: {
    country: 'Germany',
    title: 'Autobahn Answers',
    prompt: 'Name two German cities and one German food before time runs out.',
    penalty: 'If you stall, take 1 sip.',
    accent: '#f2994a',
  },
  7: {
    country: 'Belgium',
    title: 'Trappist Toast',
    prompt: 'Make a grand toast to the whole table in your best royal voice.',
    penalty: 'If the toast gets no applause, take 1 sip.',
    accent: '#1ba39c',
  },
};

export const getChallengeForStop = (stopIndex) => (
  CHALLENGES_BY_STOP[stopIndex] || {
    country: 'Europe',
    title: 'Border Check',
    prompt: 'Tell the table where your team is travelling next and why.',
    penalty: 'If the story is boring, take 1 sip.',
    accent: '#1ba39c',
  }
);
