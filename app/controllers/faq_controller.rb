class FaqController < ApplicationController
  def index
    @questions = Question.all
  end
end
