import Subreddits from 'global/subreddits'

const Utils = {
    pagesToShow: function(selectedPage, totalPages, limit) {
        var limitHalf = Math.floor(limit / 2);
        if (totalPages < limit) {
            return {
                start: 0,
                end: totalPages,
            };
        }

        if (selectedPage < limitHalf) {
            return {
                start: 0,
                end: limit,
            };
        }

        if (selectedPage > totalPages - limitHalf) {
            return {
                start: totalPages - limit,
                end: totalPages,
            };
        }

        return {
            start: selectedPage - limitHalf,
            end: selectedPage + limitHalf,
        };
    },

    subredditLink: function(subreddit, orderBy = 'score', page = 1) {
        return '/things/r/' + subreddit + '?page=' + page + '&order_by=' + orderBy
    },
    subredditTrendsLink: function(subreddit) {
        return '/things/r/' + subreddit + '/trends'
    },
    randomSub: function() {
        return Subreddits[Math.floor(Math.random() * Subreddits.length)]
    }
}

export default Utils
