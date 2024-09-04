import { createContext, useState } from "react";

export const QuizQuestionIconContext = createContext()

const QuizQuestionIconStata = ({children})=>{
    const [iconState, setIconState] = useState(true)
    const updateIconState = (state)=>{
        setIconState(state)
    }

    return(
        <QuizQuestionIconContext.Provider value={{iconState, updateIconState}}>
            {children}
        </QuizQuestionIconContext.Provider>
    )
}
export default QuizQuestionIconStata