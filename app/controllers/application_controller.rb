class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def about
    @favorites = FAVORITES.sample 10
    render 'about'
  end
end
