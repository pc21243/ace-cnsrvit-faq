class FaqController < ApplicationController
  def activeQuestions
    #question: {status: question.active? ? "created" : "deleted"}
  end

  def question_params
    params.require( :question ).permit( :name, :active )
  end

  def index
    @questions = Question.all
  end

end
