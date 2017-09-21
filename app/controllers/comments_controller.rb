class CommentsController < ApplicationController
  def show
    params.permit(:id)

    @favorites = FAVORITES.sample 10
    @comment = Comment.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => { thing: @comment.as_json(include: :things) } }
    end
  end
end

