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
            const screen_name = tweet.user.screen_name;

            T.post('friendships/create', { screen_name }, (err, res) => {
                if(err) {
                    return console.log(err);
                }

                console.log(`FOLLOWED: ${screen_name}`);
            });
        });
    } else {
        console.log(err);
    }
    
});