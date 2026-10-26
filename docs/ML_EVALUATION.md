# Synthetic model evaluation

{
  "true_positive": 95,
  "true_negative": 105,
  "false_positive": 0,
  "false_negative": 0,
  "precision": 1.0,
  "recall": 1.0,
  "train_households": 800,
  "test_households": 200
}

Fixed seed 1119. Split by unique synthetic household: 800 train / 200 held out. No shared windows. Features: mean of first 20 overnight intervals, whole-day standard deviation, longest consumption run fraction. Training includes high legitimate use and intermittent-supply patterns. Never extrapolate these metrics to real households.
