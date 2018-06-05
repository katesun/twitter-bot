const Twitter = require('twitter');
const config = require('./config.js');

const T = new Twitter(config);

const params = {
    q: '#nba',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets', params, (err, data, response) => {
    if(!err) {
        // Loop through returned tweets
        data.statuses.forEach((tweet) => {
            // Get the tweet ID from returned data
            const id = {id: tweet.id_str};

            // Try to favourite the selected tweet
            T.post('favorites/create', id, (err, response) => {
                // If the favorite fails, log the error
                if(err) {
                    return console.log(err[0].message);
                }

                // If the favorite is successful, log the url of the tweet
                const username = response.user.screen_name;
                const tweetId = response.id_str;
                console.log(`Favourited: https://twitter.com/${username}/status/${tweetId}`);
                
            });
        });
    } else {
        console.log(err);
    }
    
});