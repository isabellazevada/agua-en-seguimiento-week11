export function progress(stage) {
  const current=stage==='new'?0:['review','funding'].includes(stage)?1:stage==='scheduled'?2:3;
  return ['Aviso recibido','Revisión','Visita','Verificación'].map((label,i)=>({label,state:stage==='verified'?'complete':i<current?'complete':i===current?'current':'pending',symbol:stage==='verified'||i<current?'✓':String(i+1)}));
}
export function visitState(c) {
  if(!c.appointment?.done)return 'Cita simulada registrada. No se contactó a nadie.';
  return c.stage==='verified'?'Visita realizada y cierre verificado en esta demostración.':'Visita realizada. El caso sigue abierto; falta verificar el resultado.';
}
