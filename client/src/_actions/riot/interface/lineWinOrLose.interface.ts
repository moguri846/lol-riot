export interface ILineWinLoseRate extends ILineWinLose {
  line?: string;
}

export interface ILineWinLose {
  win: number;
  lose: number;
}
