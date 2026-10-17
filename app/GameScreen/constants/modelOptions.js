export const MODEL_OPTIONS = [
  {
    id: 'car1',
    label: 'Classic Car',
    source: require('../../../assets/models/car1.glb'),
    normalizeOrigin: true,
    transform: {
      scale: [0.03, 0.03, 0.03],
      position: [0, 0, 0],
      rotation: [-1.71, 1.3, -3.0838],
    },
  },
  {
    id: 'vehicle001',
    label: 'Vehicle 1',
    source: require('../../../assets/models/vehicle001.glb'),
    normalizeOrigin: true,
    preserveMaterials: true,
    transform: {
      scale: [0.045, 0.045, 0.045],
      position: [0, 0, 0.08],
      rotation: [-1.71, 2.9583, -3.0838],
    },
  },
  {
    id: 'minivan',
    label: 'Minivan',
    source: require('../../../assets/models/minivan.glb'),
    normalizeOrigin: true,
    transform: {
      scale: [0.001, 0.001, 0.001],
      position: [0, 0, 0],
      rotation: [-1.71, 2.9583, -3.0838],
    },
  },
  {
    id: 'vehicle002',
    label: 'Vehicle 2',
    source: require('../../../assets/models/vehicle002.glb'),
    normalizeOrigin: true,
    preserveMaterials: true,
    transform: {
      scale: [0.053, 0.053, 0.053],
      position: [0, 0, 0.08],
      rotation: [-1.71, 2.9583, -3.0838],
    },
  },
  {
    id: 'vehicle003',
    label: 'Vehicle 3',
    source: require('../../../assets/models/vehicle003.glb'),
    normalizeOrigin: true,
    preserveMaterials: true,
    transform: {
      scale: [0.052, 0.052, 0.052],
      position: [0, 0, 0.08],
      rotation: [-1.71, 2.9583, -3.0838],
    },
  },
  {
    id: 'vehicle004',
    label: 'Vehicle 4',
    source: require('../../../assets/models/vehicle004.glb'),
    normalizeOrigin: true,
    preserveMaterials: true,
    transform: {
      scale: [0.053, 0.053, 0.053],
      position: [0, 0, 0.08],
      rotation: [-1.71, 2.9583, -3.0838],
    },
  },
  {
    id: 'vehicle005',
    label: 'Vehicle 5',
    source: require('../../../assets/models/vehicle005.glb'),
    normalizeOrigin: true,
    preserveMaterials: true,
    transform: {
      scale: [0.05, 0.05, 0.05],
      position: [0, 0, 0.08],
      rotation: [-1.71, 2.9583, -3.0838],
    },
  },
  {
    id: 'vehicle006',
    label: 'Vehicle 6',
    source: require('../../../assets/models/vehicle006.glb'),
    normalizeOrigin: true,
    preserveMaterials: true,
    transform: {
      scale: [0.052, 0.052, 0.052],
      position: [0, 0, 0.08],
      rotation: [-1.71, 2.9583, -3.0838],
    },
  },
];

export const getModelOption = (modelId) => (
  MODEL_OPTIONS.find((model) => model.id === modelId) || MODEL_OPTIONS[0]
);

export const getDefaultModelOption = (teamIndex) => (
  MODEL_OPTIONS[0]
);
