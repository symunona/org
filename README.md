### Org *

This project is created to make an efficient, robust, minimalist way of sorting knowledge.

#### The Problem

Do you write? How do you organize your writings? How do you store metadata and search in that? Is it web accessible/editable? Do you want to keep using your favorite editing tool?

Over and over this problem came up, and I keep returning to plain text and md files.

Cross platform file systems are confined to simple tree structures, while many times we want to organize and index data based on other meta parameters of each file.

Many times, multiple files together form the focus of interest, we want to sort/filter based on metadata, we want to be able to create collections with similar header information.

Also, hope to bring life to more offline availability.

#### How it works

When first ran, a folder list is created in your user's profile folder `.org/indexed-folders`. You can add absolute paths to this list and they will be maintained.

`md` files of the folder structure will be parsed based on their meta data.

Within each folder that contain an `.md` file with metadata a `.schema.md` file will be generated. If you overwrite it, it'll create a new file with the new content with a different name. You may find it when sorted on date last modified.

#### Suggestions

Create your blog and or collection of posts into one folder and add a quick site generator to it.


#### Directory view

When parsed, creates an index of ALL the metadata of ALL the files in the user folder under `.org/index`

What it will be able to do:

Display indexes
Edit metadata in a table format!
Easy create new file that matches the folder and the schema when inserting new line
    Pagination, order by.
If the folder has a README.md it shows it on top
Generation on the fly
Element edit with contextual info:
    dropdown/search for enums
    date picker for dates
    smart preview for URL - dead link detection/auto save screenshot?
Search in all, fast

Custom web folder scripts:
    Form to add new element customizable, special url for adding

    Folder group preferences based on dates, e.g. group by:
        Year/Month/Day - kinda like a db - log like

    Static file generation for blog.


### Example usages
- Rate your TED/Youtube videos, movies
    - Smart automations: download when new url is found:
    - e.g. youtube/ted/yt-download -> auto backup & auto create links to downloaded
- Browser favorites
    - link your favorites structures, bridge between browser favorites and a special folder
- Zen text editor, with image upload & organize in configurable folder for blogs & preview
- Idea store about topics/projects
