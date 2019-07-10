class FaqsController < ApplicationController
  def destroy
    question = Question.find(params[:id])
    if question.active
      if question.update(active: false)
        redirect_to root_path, notice: "success"
      else
        redirect_to root_path, alert: "fail"
      end
    else
      if question.update(active: true)
        redirect_to root_path, notice: "success"
      else
        redirect_to root_path, alert: "fail"
      end
    end
  end

  def question_params
    params.require( :question ).permit( :name, :active )
  end

  def index
    @questions = Question.content.active
    @emptyQuestions = Question.active
    @allQuestions = Question.all
  end
end
