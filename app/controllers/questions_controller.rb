class QuestionsController < ApplicationController

  

  private

  def question_params
    params.require(question).permit(:active, :content)
  end


end
