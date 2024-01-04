export interface IWordDefinition {
  type: string,
  meaning: string,
  meaningVN: string
}

export interface IWord {
  id: number,
  createdAt: string,
  updatedAt: string,
  word: string,
  definition: IWordDefinition[],
  example: string,
  exampleVN: string
}
export interface IWordMeta {
  page: number,
  limit: number,
  totalPages: number,
  total: number
}