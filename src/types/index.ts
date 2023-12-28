export interface IWordDefinition {
  type: string,
  meaning: string
}

export interface IWord {
  id: Number,
  createdAt: string,
  updatedAt: string,
  word: string,
  definition: IWordDefinition[],
  example: string
}