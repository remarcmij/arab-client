import * as React from 'react'

type Props = {
  lemmas: Lemma[]
}

const WordList: React.FC<Props> = props => {
  const renderWords = () => {
    const { lemmas } = props
    return lemmas.map((lemma, index) => (
      <li key={index}>
        <span>{lemma.base}</span>
        {', '}
        <span dir="rtl">{lemma.foreign}</span>
        {', '}
        <span>{lemma.trans}</span>
      </li>
    ))
  }

  return <ul>{renderWords()}</ul>
}

export default WordList
