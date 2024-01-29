---
layout: post
title: "A tiny Vim Snippet"
permalink: /2024-01-28/
usemathjax: true
categories: Computer-Science
math: true
mathjax: true
---  

## Brief description
A tiny code snippet for Vim using `UltiSnips` plugin that can convert links to papers into APA citation in markdown.  

The first snippet auto-completes `alin` and form a block of code with the link inside. The second snippet evaluates the link and returns the APA citation in markdown.

## Usage
1. Copy the code below into your `UltiSnips` folder, which on my Mac is `~/.vim/UltiSnips/`.
2. Open a markdown file, type `alin` and press `tab`. This will create a block of code with the link inside; press `tab` again to complete the link.  

![Usage](/assets/output.gif)

## Code
```python

snippet alin "create markdown links from paper links" w
alin $1 alin$0    
endsnippet

priority 1000
snippet 'alin(.*)alin' "evaluate link and return APA cite in markdown" wr
`!p
import requests
from bs4 import BeautifulSoup
import json
# suppress warnings
import warnings
warnings.filterwarnings("ignore")

def get_arxiv_metadata(arxiv_id):
    url = f'http://export.arxiv.org/api/query?id_list={arxiv_id}'
    response = requests.get(url)
    
    feed = BeautifulSoup(response.content)
    entry = feed.find('entry')

    print(entry)

    print(entry.find_all('author'))

    authors = [author.find('name').text for author in entry.find_all('author')]
    published_date = entry.find('published').text
    year = published_date.split('-')[0]
    return authors, year

def get_openreview_metadata(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the script tag with the data
    script_tag = soup.find('script', {'id': '__NEXT_DATA__'})
    if not script_tag:
        raise Exception('Data script tag not found')

    # Extract the JSON content from the script tag
    data_str = script_tag.string
    data_json = json.loads(data_str)
    
    authors = data_json['props']['pageProps']['forumNote']['content']['authors']
    if isinstance(authors, dict):
        authors = authors['value']
    
    try:
        year = data_json['props']['pageProps']['forumNote']['invitation']
    except KeyError:
        year = data_json['props']['pageProps']['forumNote']['invitations'][0]

    # year of the form neurips.cc/2021/...
    year = year.split('/')[1]
    return authors, year

def format_authors(authors):
    if len(authors) == 1:
        # use last names only
        return authors[0].split(' ')[-1]
    elif len(authors) == 2:
        return f"{authors[0].split(' ')[-1]} and {authors[1].split(' ')[-1]}"
    else:
        print(authors)
        return f"{authors[0].split(' ')[-1]} et al."

def generate_citation(arxiv_link, type = 'arxiv'):
    if type == 'arxiv':
        # Ensure link is to the 'abs' page, not the 'pdf' page
        arxiv_link = arxiv_link.replace('/pdf/', '/abs/').replace('.pdf', '')
        arxiv_id = arxiv_link.split('/')[-1]
        authors, year = get_arxiv_metadata(arxiv_id)
        formatted_authors = format_authors(authors)
        citation = f"[{formatted_authors}, {year}]({arxiv_link})"
    
    elif type == 'openreview':
        # openreview_id = arxiv_link.split('/')[-1].split('?')[-1].split('=')[-1]
        # replace pdf with forum
        arxiv_link = arxiv_link.replace('/pdf?', '/forum?')
        
        authors, year =  get_openreview_metadata(arxiv_link)
        formatted_authors = format_authors(authors)
        citation = f"[{formatted_authors}, {year}]({arxiv_link})"
    return citation

arxiv_link = f"{match.group(1)}"
arxiv_link = arxiv_link.strip()

type = None
if 'arxiv' in arxiv_link:
    type = 'arxiv'
elif 'openreview' in arxiv_link:
    print('openreview')
    type = 'openreview'

snip.rv = generate_citation(arxiv_link, type)
`
endsnippet
```

In the future, I will probably add the CVF links too.