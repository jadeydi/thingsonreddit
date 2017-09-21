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
    subreddit = params[:subreddit] || 'DIY'

    @things = Thing.limit(10)
      .where("subreddit = ? ", subreddit)
      .order("#{order_by} #{order_dir}")

    respond_to do |format|
      format.html
      format.json { render :json => { things: @things.as_json } }
    end
  end
end
