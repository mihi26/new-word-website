import { useState, useEffect, Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ApiClientWithToken from "../../api/api"
import { BackArrow } from "../../components/icons/BackArrow"

const WordDetailPage = () => {
  const [wordDetail, setWordDetail] = useState<any>({})
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getWordDetail()
  }, [])

  const getWordDetail = async () => {
    let res = await ApiClientWithToken.get(`word/${params.wordId}`)
    setWordDetail(res.data)
  }

  const handleBack = () => {
    navigate("/all-words")
  }

  return (
    <div className="flex flex-col gap-[30px]">
      <BackArrow width={32} height={32} className="cursor-pointer" onClick={handleBack}/>
      <div className="flex flex-col rounded-b bg-white shadow">
        <div className="flex h-[75px] justify-between items-center px-[20px] border-b">
          <div className="text-2xl text-[#00578A] font-bold">
            {wordDetail.word}
          </div>
        </div>
        <div className="p-[20px] flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="text-xl text-black font-bold">Category</div>
            <div className="text-black">{wordDetail.category}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl text-black font-bold">Definition</div>
            {wordDetail.definition
              ? wordDetail.definition.map((definition) => (
                  <div
                    className="flex gap-3 items-center"
                    key={definition.type + definition.meaning}
                  >
                    <div className="font-bold min-w-20">{definition.type}</div>
                    <div className="text-black">{`${definition.meaning} (${definition.meaningVN})`}</div>
                  </div>
                ))
              : ""}
          </div>
          <div className="text-xl text-black font-bold">Example</div>
          <div className="text-black italic">{`"${wordDetail.example}"`}</div>
          <div className="text-black italic">{`"${wordDetail.exampleVN}"`}</div>
          {wordDetail.synonyms ? (
            <Fragment>
              <div className="text-xl text-black font-bold">Synonyms</div>
              {wordDetail.synonyms.map((synonym) => (
                <Fragment key={synonym.type + wordDetail.id}>
                  {synonym.strongest ? (
                    <Fragment>
                      <div className="text-black font-medium">
                        Strongest matches
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        {synonym.strongest.map((word) => (
                          <div
                            className="underline underline-offset-4 decoration-4 decoration-[#00b316]"
                            key={`strongest ${word}`}
                          >
                            {word}
                          </div>
                        ))}
                      </div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                  {synonym.strong ? (
                    <Fragment>
                      <div className="text-black font-medium">
                        Strong matches
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        {synonym.strong
                          ? synonym.strong.map((word) => (
                              <div
                                className="underline underline-offset-4 decoration-4 decoration-[#00da1b80]"
                                key={`strong ${word}`}
                              >
                                {word}
                              </div>
                            ))
                          : ""}
                      </div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                  {synonym.weak ? (
                    <Fragment>
                      <div className="text-black font-medium">Weak matches</div>
                      <div className="flex gap-4 flex-wrap">
                        {synonym.weak
                          ? synonym.weak.map((word) => (
                              <div
                                className="underline underline-offset-4 decoration-4 decoration-[#00da1b33]"
                                key={`weak ${word}`}
                              >
                                {word}
                              </div>
                            ))
                          : ""}
                      </div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default WordDetailPage
