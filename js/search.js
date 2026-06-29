(function () {
  var input = document.getElementById("search-input");
  var resultsList = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  var page = document.querySelector("[data-search-index]");
  var index;
  var documents = [];
  var documentsById = {};
  var lastResults = [];

  if (!input || !resultsList || !status || !page || typeof lunr === "undefined") {
    return;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function compactText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function getTerms(query) {
    var matches = query.toLowerCase().match(/[a-z0-9_+-]+/g);
    return matches ? matches.filter(function (term) { return term.length > 1; }) : [];
  }

  function uniqueValues(values) {
    var seen = {};
    return values.filter(function (value) {
      if (seen[value]) {
        return false;
      }

      seen[value] = true;
      return true;
    });
  }

  function highlightTerms(value, terms) {
    var escaped = escapeHtml(value);
    var uniqueTerms = uniqueValues(terms).map(escapeRegExp);

    if (!uniqueTerms.length) {
      return escaped;
    }

    return escaped.replace(new RegExp("(" + uniqueTerms.join("|") + ")", "gi"), "<mark>$1</mark>");
  }

  function makeSnippet(content, query) {
    var text = compactText(content);
    var terms = getTerms(query);
    var lowerText = text.toLowerCase();
    var matchIndex = -1;

    for (var i = 0; i < terms.length; i++) {
      matchIndex = lowerText.indexOf(terms[i]);
      if (matchIndex !== -1) {
        break;
      }
    }

    var start = matchIndex > 80 ? matchIndex - 80 : 0;
    var end = Math.min(text.length, start + 190);

    if (start > 0) {
      start = text.indexOf(" ", start);
      start = start === -1 ? 0 : start + 1;
    }

    if (end < text.length) {
      var nextSpace = text.lastIndexOf(" ", end);
      end = nextSpace > start ? nextSpace : end;
    }

    var snippet = text.slice(start, end);
    var prefix = start > 0 ? "... " : "";
    var suffix = end < text.length ? " ..." : "";

    return prefix + highlightTerms(snippet, terms) + suffix;
  }

  function joinField(value) {
    return Array.isArray(value) ? value.join(" ") : String(value || "");
  }

  function setStatus(message) {
    status.textContent = message || "";
  }

  function clearResults() {
    lastResults = [];
    resultsList.innerHTML = "";
    setStatus("");
  }

  function renderResults(results, query) {
    lastResults = results;

    if (!query) {
      clearResults();
      return;
    }

    if (!results.length) {
      resultsList.innerHTML = '<li class="search-empty">No results found</li>';
      setStatus("No results found");
      return;
    }

    var markup = results.slice(0, 20).map(function (result) {
      var item = documentsById[result.ref];
      var meta = [item.dateDisplay, joinField(item.categories), joinField(item.tags)]
        .filter(Boolean)
        .join(" / ");

      return [
        '<li class="search-result">',
        '<a class="search-result-link" href="' + escapeHtml(item.url) + '">',
        '<span class="search-result-title">' + highlightTerms(item.title, getTerms(query)) + '</span>',
        meta ? '<span class="search-result-meta">' + escapeHtml(meta) + '</span>' : "",
        '<span class="search-result-snippet">' + makeSnippet(item.content, query) + '</span>',
        "</a>",
        "</li>"
      ].join("");
    }).join("");

    resultsList.innerHTML = markup;
    setStatus(results.length === 1 ? "1 result" : results.length + " results");
  }

  function buildIndex(items) {
    documents = items.map(function (item, position) {
      item.id = String(position);
      documentsById[item.id] = item;
      return item;
    });

    index = lunr(function () {
      this.ref("id");
      this.field("title", { boost: 10 });
      this.field("categories", { boost: 4 });
      this.field("tags", { boost: 4 });
      this.field("content");

      documents.forEach(function (item) {
        this.add({
          id: item.id,
          title: item.title,
          categories: joinField(item.categories),
          tags: joinField(item.tags),
          content: item.content
        });
      }, this);
    });
  }

  function search(query) {
    var terms = getTerms(query);

    if (!index || !terms.length) {
      renderResults([], query);
      return;
    }

    var results = index.search(terms.join(" "));

    renderResults(results, query);
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  fetch(page.getAttribute("data-search-index"))
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load search index");
      }

      return response.json();
    })
    .then(function (items) {
      buildIndex(items);
      search(input.value.trim());
    })
    .catch(function () {
      resultsList.innerHTML = '<li class="search-error">Search is unavailable.</li>';
      setStatus("Search index failed to load");
    });

  var initialQuery = getQueryParam("q") || getQueryParam("query");
  if (initialQuery) {
    input.value = initialQuery;
  }

  input.addEventListener("input", function () {
    search(input.value.trim());
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && lastResults.length) {
      event.preventDefault();
      window.location.href = documentsById[lastResults[0].ref].url;
    }
  });
})();
