export interface IWordDefinition {
    type: string,
    meaning: string,
    meaningVN: string
}

export interface ISynonyms {
    type: string,
    strongest: string[],
    strong: string[],
    weak: string[],
}

export interface IWord {
    id: number,
    createdAt: string,
    updatedAt: string,
    word: string,
    definition: IWordDefinition[],
    category: string,
    collocation: string,
    synonyms: ISynonyms[]
    example: string,
    exampleVN: string
}
export interface IWordParams {
  page: number,
  limit: number
}

export interface IWordMeta {
  page: number,
  limit: number,
  total: number,
  totalPages: number
}