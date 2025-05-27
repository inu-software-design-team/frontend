export function getLevelFromScore(score: number): number {
  return score === 100 ? 1 : score < 10 ? 9 : Math.ceil((100 - score) / 10);
}

export function getConfirmMessage(message: string): string {
  return `${message}\n\n반드시 "저장" 버튼을 클릭해야 반영됩니다.`;
}
