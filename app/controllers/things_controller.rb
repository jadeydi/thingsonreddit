class ThingsController < ApplicationController

  def show
    params.permit(:id)

    @thing = Thing.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => { thing: @thing.as_json } }
    end
  end

  def index
    params.permit(:order_by, :order_dir, :subreddit, :page)

    order_by = params[:order_by] || 'score'
    order_dir = params[:order_dir] || 'desc'
    subreddit = params[:subreddit] || 'todayilearned'
    @month = 1
    @year = 2015
    @subreddit = subreddit

    @things = Thing.paginate(page: params[:page] || 1)
      .where("subreddit = ? ", subreddit)
      .order("#{order_by} #{order_dir}")

    respond_to do |format|
      format.html
      format.json { render :json => {
        total_things: @things.total_entries,
        things: @things.as_json,
        subreddit: @subreddit.as_json,
        current_page: @things.current_page,
        total_pages: @things.total_pages,
        year: @year,
        month: @month,
      } }
    end
  end
end
