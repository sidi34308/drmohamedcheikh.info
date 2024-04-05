document.addEventListener("DOMContentLoaded", function() {
    var newsData; // Variable to hold news data
    var newsIndex = 0; // Index to track which news items are displayed
    var newsContainer = document.getElementById("news-container");
    var loadMoreBtn = document.getElementById("load-more");

    // Load news data from JSON file
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/news_fr.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            newsData = JSON.parse(xhr.responseText);
            displayNews();
        }
    };
    xhr.send();

    // Function to display news items
    function displayNews() {
        for (var i = newsIndex; i < newsIndex + 4; i++) {
            if (newsData[i]) {
                var newsItem = newsData[i];
                var card = document.createElement("div");
                card.className = "news-card";
                var content = document.createElement("div");
                content.className = "card-content";
                var image = document.createElement("img");
                image.src = newsItem.image;
                var title = document.createElement("h3");
                title.textContent = newsItem.title;
                var summary = document.createElement("p");
                summary.textContent = newsItem.summary; // Summary added
                var readMore = document.createElement("a");
                readMore.href = newsItem.link;
                readMore.textContent = "Lire la suite";
                readMore.target = "_blank";

                card.appendChild(content);
                card.appendChild(image);
                content.appendChild(title);
                content.appendChild(summary); // Append summary to card
                content.appendChild(readMore);
                newsContainer.appendChild(card);
            }
        }

        newsIndex += 4;

        // Hide load more button if all news items are displayed
        if (newsIndex >= newsData.length) {
            loadMoreBtn.style.display = "none";
        }
    }

    // Load more news items when load more button is clicked
    loadMoreBtn.addEventListener("click", function() {
        displayNews();
    });
});
