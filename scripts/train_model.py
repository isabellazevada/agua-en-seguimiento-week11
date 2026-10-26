"""Reproducible synthetic-household logistic regression. No real household data."""
import json
from pathlib import Path
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
rng=np.random.default_rng(1119)
def sample(leak=False):
    v=np.maximum(0,rng.normal(0.06,0.09,96))
    for _ in range(int(rng.integers(4,13))):
        start=int(rng.integers(0,92));duration=int(rng.integers(1,5))
        v[start:start+duration]+=rng.uniform(5,50)
    if leak:v+=rng.uniform(.6,7)
    # Legitimate high-use pulses and intermittent supply are synthetic edge cases.
    if rng.random()<.18:v[70:86]+=rng.uniform(12,35)
    if rng.random()<.12:v[32:48]=0
    return np.round(v,3)
def features(v):
    longest=current=0
    for x in v:
        current=current+1 if x>.3 else 0;longest=max(longest,current)
    return [np.mean(v[:20]),np.std(v),longest/len(v)]
y=np.array([i%2 for i in range(1000)],dtype=float)
series=[sample(bool(t)) for t in y]
X=np.array([features(v) for v in series])
order=rng.permutation(1000);train=order[:800];test=order[800:]
mean=X[train].mean(axis=0);scale=X[train].std(axis=0)
Z=(X[train]-mean)/scale;w=np.zeros(3);b=0.
for _ in range(5000):
    pr=1/(1+np.exp(-np.clip(Z@w+b,-30,30)));err=pr-y[train]
    w-=.06*(Z.T@err/len(train)+.002*w);b-=.06*err.mean()
prob=1/(1+np.exp(-np.clip(((X[test]-mean)/scale)@w+b,-30,30)))
pred=prob>=.5;truth=y[test].astype(bool)
tp=int(np.sum(pred&truth));tn=int(np.sum(~pred&~truth));fp=int(np.sum(pred&~truth));fn=int(np.sum(~pred&truth))
metrics={'true_positive':tp,'true_negative':tn,'false_positive':fp,'false_negative':fn,'precision':tp/max(1,tp+fp),'recall':tp/max(1,tp+fn),'train_households':800,'test_households':200}
model={'version':'synthetic-logreg-v1','seed':1119,'features':['night_mean','std','longest_run_fraction'],'mean':mean.tolist(),'scale':scale.tolist(),'weights':w.tolist(),'bias':b,'threshold':.5,'metrics':metrics,'disclaimer':'Synthetic-only evaluation. Not validated on real homes.'}
(ROOT/'dist/model.json').write_text(json.dumps(model,indent=2))
normal=sample(False);leak=sample(True)
scenarios={'normal':normal.tolist(),'leak':leak.tolist(),'insufficient':[None if i%3==0 else float(normal[i]) for i in range(96)]}
(ROOT/'dist/scenarios.json').write_text(json.dumps(scenarios))
(ROOT/'docs/ML_EVALUATION.md').write_text('# Synthetic model evaluation\n\n'+json.dumps(metrics,indent=2)+'\n\nFixed seed 1119. Split by unique synthetic household: 800 train / 200 held out. No shared windows. Features: mean of first 20 overnight intervals, whole-day standard deviation, longest consumption run fraction. Training includes high legitimate use and intermittent-supply patterns. Never extrapolate these metrics to real households.\n')
print(json.dumps(metrics))
assert metrics['precision']>=.8 and metrics['recall']>=.8
