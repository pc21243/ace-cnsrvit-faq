class QuestionsController < ApplicationController

  def update
    question = Question.find(params[:id])
    if question.update(question_params)
      "success"
    else
      "fail"
    end
  end

  private

  def question_params
    params.require(question).permit(:active, :content)
  end


end
