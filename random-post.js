//<![CDATA[
// Feed configuration
var homePage = 'http://linteksi.blogspot.com',
    maxResults = 7,
    containerId = 'random-post-container';
// Function to generate random number limited from `min` to `max`
// Used to create a valid and safe random feed `start-index`
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to shuffle arrays
// Used to randomize order of the generated JSON feed
function shuffleArray(arr) {
    var i = arr.length, j, temp;
    if (i === 0) return false;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
// Get a random start index
function createRandomPostsStartIndex(json) {
    var startIndex = getRandomInt(1, (json.feed.openSearch$totalResults.$t - maxResults));
    // console.log('Get the post feed start from ' + startIndex + ' until ' + (startIndex + maxResults));
    document.write('<scr' + 'ipt src="' + homePage + '/feeds/posts/summary?alt=json-in-script&orderby=updated&start-index=' + startIndex + '&max-results=' + maxResults + '&callback=randomPosts"></scr' + 'ipt>');
}
// Widget's main function
function randomPosts(json) {
    var link, ct = document.getElementById(containerId),
        entry = shuffleArray(json.feed.entry),
        skeleton = "<ul>";
    for (var i = 0, len = entry.length; i < len; i++) {
        for (var j = 0, jen = entry[i].link.length; j < jen; j++) {
            if (entry[i].link[j].rel == "alternate") {
                link = entry[i].link[j].href;
            }
        }
        skeleton += '<li><a href="' + link + '">' + entry[i].title.$t + '</a></li>';
    }
    ct.innerHTML = skeleton + '</ul>';
}
document.write('<scr' + 'ipt src="' + homePage + '/feeds/posts/summary?alt=json-in-script&max-results=0&callback=createRandomPostsStartIndex"></scr' + 'ipt>');
//]]>