class FaqsController < ApplicationController

  def update
    question = Question.find(params[:id])
    if question.active

      if question.update(active: false)
        redirect_to root_path, notice: "The Question has successfully been deleted."
      else
        redirect_to root_path, alert: "There has been a faliure. Please report"
      end

    else

      if question.update(active: true)
        redirect_to root_path, notice: "The Question has successfully been recovered."
      else
        redirect_to root_path, alert: "There has been a faliure. Please report"
      end

    end

  end


  def question_params
    params.require( :question ).permit( :name, :active )
  end

  def index

    @questions = Question.content.active
    @empty_questions = Question.active
    @all_questions = Question.all

  end

end
