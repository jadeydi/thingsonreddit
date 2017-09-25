Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :things do
    get '/r/:subreddit', on: :collection, action: 'index'
    get '/r/:subreddit/trends', on: :collection, action: 'trends'
    get '/r/:subreddit/by_author', on: :collection, action: 'by_author'
    get '/r/:subreddit/by_month', on: :collection, action: 'by_month'
  end

  resources :comments

  get '/about', to: 'application#about'

  root 'things#index'
end
