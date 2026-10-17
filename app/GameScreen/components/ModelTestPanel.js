import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ModelTestPanel = ({ gamePieces, onChangeModel }) => (
  <View style={styles.panel}>
    {gamePieces.map((piece) => (
      <View key={piece.id} style={styles.row}>
        <Text style={styles.teamLabel}>{piece.label}</Text>
        <TouchableOpacity
          onPress={() => onChangeModel(piece.id, -1)}
          style={styles.iconButton}
        >
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.modelLabel}>{piece.model.label}</Text>
        <TouchableOpacity
          onPress={() => onChangeModel(piece.id, 1)}
          style={styles.iconButton}
        >
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.68)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 28,
  },
  teamLabel: {
    width: 54,
    color: '#fff',
    fontSize: 10,
    fontFamily: 'dogicapixel',
  },
  iconButton: {
    width: 28,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(135, 206, 250, 0.72)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  modelLabel: {
    width: 82,
    color: '#FFD700',
    fontSize: 10,
    fontFamily: 'dogicapixel',
  },
});

export default ModelTestPanel;
