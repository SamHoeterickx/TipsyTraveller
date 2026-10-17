import { StyleSheet, Text, View } from 'react-native';

const GameHud = ({ activeTeamLabel, fromName, lastRoll, progress, remainingMoves, state, toName }) => (
  <>
    {state !== 'done' && (
      <View style={styles.hudOverlay} pointerEvents="none">
        <Text style={styles.hudTeam}>{activeTeamLabel}</Text>
        <Text style={styles.hudRoute}>{fromName}  -  {toName}</Text>
        <Text style={styles.hudProgress}>
          {state === 'moving' && `Roll ${lastRoll} - ${remainingMoves} stops left`}
          {state === 'challenge' && 'Complete the country challenge'}
          {!['moving', 'challenge'].includes(state) && `Leg ${progress}`}
        </Text>
      </View>
    )}

    {state === 'done' && (
      <View style={styles.doneOverlay} pointerEvents="none">
        <Text style={styles.doneText}>Tour complete!</Text>
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  hudOverlay: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    backgroundColor: '#FFF1CD',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 3,
    borderColor: '#111111',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
  },
  hudTeam: { color: '#1BA39C', fontSize: 12, fontFamily: 'dogicapixelbold', textTransform: 'uppercase' },
  hudRoute: { color: '#111111', fontSize: 14, fontFamily: 'dogicapixelbold', marginTop: 4 },
  hudProgress: { color: '#2C3E50', fontSize: 10, marginTop: 4, fontFamily: 'dogicapixel' },

  doneOverlay: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    backgroundColor: '#FFF1CD',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  doneText: { color: '#111111', fontSize: 16, fontFamily: 'dogicapixelbold' },
});

export default GameHud;
