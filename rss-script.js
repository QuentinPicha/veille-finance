const feeds = [
  { name: "Le Monde (Économie)", url: "https://www.lemonde.fr/economie/rss_full.xml" },
  { name: "WSJ Markets", url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml" },
  { name: "WallStreetBets (Reddit)", url: "https://www.reddit.com/r/wallstreetbets/.rss" },
  { name: "Le Temps", url: "https://www.letemps.ch/rss" },
  { name: "Bloomberg Businessweek", url: "https://www.bloomberg.com/feed/podcast/bloombergbusinessweek.xml" },
  { name: "Financial Times (proxy)", url: "https://rss.app/feeds/J9Ub9yQbBJ0wRrSB.xml" },
  { name: "Business Insider", url: "https://markets.businessinsider.com/rss/news" },
  { name: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html" },
  { name: "Reuters", url: "http://feeds.reuters.com/reuters/businessNews" },
  { name: "Fortune", url: "https://fortune.com/feed/" }
];

const proxy = "https://feedroll-proxy.glitch.me/?url=";

async function loadFeeds() {
  const container = document.getElementById("rss-container");

  for (const feed of feeds) {
    try {
      const res = await fetch(proxy + encodeURIComponent(feed.url));
      const data = await res.json();

      const box = document.createElement("div");
      box.className = "bg-white p-4 rounded shadow";

      box.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${feed.name}</h2>
        <ul class="space-y-1">
          ${data.items.slice(0, 5).map(item =>
            `<li><a href="${item.link}" class="text-blue-600 hover:underline" target="_blank">${item.title}</a></li>`
          ).join("")}
        </ul>
      `;
      container.appendChild(box);
    } catch (error) {
      console.error("Erreur lors du chargement du flux:", feed.name, error);
    }
  }
}

loadFeeds();
