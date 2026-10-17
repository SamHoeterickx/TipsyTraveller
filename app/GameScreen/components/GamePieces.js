import GamePiece from './GamePiece';

const GamePieces = ({
  driving,
  gamePieces,
  movingPieceId,
  moveTargets,
  teamProgress,
  pieceRefs,
  onMoveComplete,
}) => (
  <>
    {gamePieces.map((piece) => {
      const progress = teamProgress[piece.id] || { currentLeg: 0, isDone: false };
      const targetLeg = moveTargets[piece.id] ?? progress.currentLeg;

      return (
        <GamePiece
          key={`${piece.id}-${piece.model.id}`}
          piece={piece}
          pieceRef={pieceRefs[piece.id]}
          driving={driving && movingPieceId === piece.id && !progress.isDone}
          currentLeg={progress.currentLeg}
          targetLeg={targetLeg}
          onMoveComplete={onMoveComplete}
        />
      );
    })}
  </>
);

export default GamePieces;
