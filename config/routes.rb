Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :things do
    get '/s/:subreddit', on: :collection, action: 'index'
    get '/s/:subreddit/trends', on: :collection, action: 'trends'
    get '/s/:subreddit/by_author', on: :collection, action: 'by_author'
    get '/s/:subreddit/by_day', on: :collection, action: 'by_day'
  end

  resources :comments

  root 'things#index'
end
