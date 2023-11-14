# dog-dashboard

## Summary - 
After looking at the different API's and being a dog lover, I thought I would use the DogAPI to create a compendium of dog breeds. I had once heard that dog life expectancy often decreases with weight, so I decided to show this in a scatter plot. It is interesting to see the differences when sorting by breed. 

## Instructions - 
To run the codebase, clone the repo and type 'npm run start' or try it on the linked github pages.
[Try Me](https://danielfaro.github.io/dog-dashboard/)

You can sort the table data by simply clicking on

## App Structure - 
I created 3 separate components which are used by the main App component. 
1. Chart - Shows scatterplot of life_span vs weight. 
2. Table - Shows dog breed list and takes care of sorting.
3. SearchBar - allows user to enter text and search any text related data within the table.
   It will return data where any cell text includes the searced string, even if a user searches
   an incomplete word.
   
## Library choices

### State Management - 

**Zustand** - Redux seemed like overkill for a small application and I wantedt to challenge myself by trying a new library. I chose zustand due to the small boilerplate and straightforward usage. Some local state was used e.g. the search bar uses a searchValue for the input, which is then sent to the store and set in global state as 'searchTerm'. 

### Visualization - 

**ChartJS with recharts** - I had used ChartJS in the past and with some minor research was able to implement a scatter plot. It also seemed more straight forward than d3, which I don't have much experience with.

### Styling - 

**Styled-Components** - I decided to use styled-components for all accept the table component,
which had a more complicated structure. I decided to create a separate css file for the table to 
not end up with an enormous main Table component which would decrease readability. Styled-components
provided me with enough functionality without having to rely on prebuilt component libraries and global themes as with e.g. MaterialUI.

### Testing - 

**Jest & React-Testing-Library** - I have used Jest and React-Testing-Library in the past and find the syntax straight-forward and readable. I have made some tests for every component, but there are many more which could be written, especially for the sorting and filtering functionality.

## Things I'm Proud of - 
I used memoization where I could, but due to having to fit everything within a timeframe, there are definite ways to improve performance. (see possible enhancements)
I am a fan of the dog image showing on hover in the tooltip. I found this a good way to decrease the table row height and show more data per page.
I think I chose a good set of data to visualize, especially interesting to see the chart after searching.

## Possible Enhancements - 
1. Table Pagination - I decided to fit everything on one screen and make the table scrollable. One option would be to add pagination where there is no scrolling, but instead the user navigates to the next page of data. This could increase performance. 
2. Lazy loading images
3. More memoization
4. Research Chart rerendering to prevent new renders if it is given previously received data
5. I would ideally get rid of the search button and add debouncing to prevent constant resetting of the searchTerm; however, with the time constraint I found a search button to be the quickest to implement. 

