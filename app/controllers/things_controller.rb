class ThingsController < ApplicationController

  def trends
    params.permit(:subreddit)

    subreddit = params[:subreddit] || SUBREDDITS.sample
    @subreddit = subreddit

    render 'trends'
  end

  def by_author
    params.permit(:subreddit)
    @subreddit = params[:subreddit]

    @stats = Thing.where('subreddit = ?', @subreddit).group('author').count
    render json: @stats.to_a
  end

  def by_day
    params.permit(:subreddit)
    @subreddit = params[:subreddit]

    @stats = Thing.where('subreddit = ?', @subreddit).group_by_day('created_utc').count
    render json: @stats
  end

  def index
    params.permit(:order_by, :order_dir, :subreddit, :page)

    order_by = params[:order_by] || 'score'
    order_dir = params[:order_dir] || 'desc'
    subreddit = params[:subreddit] || SUBREDDITS.sample
    @subreddit = subreddit

    @favorites = FAVORITES.sample 10
    @things = Thing.paginate(page: params[:page] || 1)
      .includes(:comment)
      .where("things.subreddit = ? ", subreddit)
      .order("#{order_by} #{order_dir}")

    respond_to do |format|
      format.html
      format.json { render :json => {
        total_things: @things.total_entries,
        things: @things.as_json(include: [:comment]),
        subreddit: @subreddit.as_json,
        current_page: @things.current_page,
        total_pages: @things.total_pages,
        favorites: @favorites
      } }
    end
  end

end
