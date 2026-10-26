export const CAPACITY = 8;
export function features(v) {
  let longest=0,current=0;
  for(const x of v){current=x>.3?current+1:0;longest=Math.max(longest,current)}
  const avg=v.reduce((a,b)=>a+b,0)/v.length;
  return [v.slice(0,20).reduce((a,b)=>a+b,0)/20,Math.sqrt(v.reduce((s,x)=>s+(x-avg)**2,0)/v.length),longest/v.length];
}
export function infer(values,model,updatedAt,now=Date.now()) {
  if(!Number.isFinite(updatedAt)||now-updatedAt>86400000||updatedAt>now)return {kind:'stale',score:null};
  if(values.length!==96||values.some(x=>!Number.isFinite(x)||x<0||x>10000))return {kind:'insufficient',score:null};
  const f=features(values);const z=f.reduce((s,x,i)=>s+(x-model.mean[i])/model.scale[i]*model.weights[i],model.bias);
  const score=1/(1+Math.exp(-z));return {kind:score>=model.threshold?'alert':'normal',score};
}
export function validateReading(value,date,readings,now=Date.now()) {
  if(value===''||value===null||!Number.isFinite(Number(value))||Number(value)<0||Number(value)>10000)return 'Escribe un número entre 0 y 10,000 litros.';
  const at=new Date(date).getTime();
  if(!Number.isFinite(at)||at>now)return 'Elige una fecha y hora válida que no esté en el futuro.';
  if(readings.some(r=>r.at===at))return 'Ya existe una lectura para esa fecha y hora.';
  if(readings.length>=672)return 'Alcanzaste el límite de 672 lecturas.';
  return null;
}
export function book(state,caseId,technician,slot) {
  const c=state.cases.find(c=>c.id===caseId);
  if(!c)return 'Caso no encontrado.';
  if(c.appointment&&!c.appointment.done)return 'Este caso ya tiene una cita pendiente.';
  if(state.used>=CAPACITY)return 'Sin cupo disponible. El caso sigue pendiente; no hay cita confirmada.';
  if(!['T-01','T-02'].includes(technician)||!['09:00','10:00','11:00','12:00'].includes(slot))return 'Selecciona un técnico y un horario del catálogo.';
  const reservations=state.bookings||state.cases.map(x=>x.appointment).filter(Boolean);
  if(reservations.some(x=>x.technician===technician&&x.slot===slot))return 'Ese técnico ya tiene ocupado ese horario.';
  if(!state.bookings)state.bookings=reservations.map(x=>({...x}));
  c.appointment={technician,slot,done:false};state.bookings.push({technician,slot,caseId});c.stage='scheduled';state.used++;return null;
}
export function closeCase(c,observation,before,after,confirmation,details={}) {
  if(c.stage!=='visited')return 'Primero registra una visita.';
  if(!observation||!['leak-fixed','no-leak','needs-work'].includes(observation))return 'Falta la observación técnica.';
  if(before===''||after===''||!Number.isFinite(Number(before))||!Number.isFinite(Number(after))||Number(before)<0||Number(after)<0||Number(before)>10000||Number(after)>10000)return 'Completa ambas lecturas con valores entre 0 y 10,000 L.';
  if(confirmation!=='yes'||observation==='needs-work'||Number(after)>Number(before)||(observation==='leak-fixed'&&Number(after)>=Number(before))){c.stage='review';return 'El caso sigue abierto: requiere segunda revisión.';}
  if(!['manual','sensor'].includes(details.source))return 'Indica de dónde vienen las lecturas de la comparación.';
  const beforeStart=Date.parse(details.beforeStart),afterStart=Date.parse(details.afterStart),duration=Number(details.duration);
  if(![15,30,60].includes(duration)||!Number.isFinite(beforeStart)||!Number.isFinite(afterStart))return 'Completa las fechas y la duración de ambos periodos.';
  if(beforeStart+duration*60000>afterStart||afterStart+duration*60000>Date.now())return 'Los periodos no deben superponerse, estar invertidos ni terminar en el futuro.';
  if(details.comparable!==true)return 'Confirma periodos de la misma duración y condiciones similares.';
  c.stage='verified';c.evidence={observation,before:Number(before),after:Number(after),confirmation,source:details.source,beforeStart,afterStart,duration,verifiedAt:Date.now()};return null;
}
