# Rise Google Calendar Walkthrough

## Introduction

This walkthrough will take you through all the steps required to set up a single instance of the Rise Google Calendar Component. This demo will use the data returned by the Component to construct an HTML table of events, however this is just one example of how the data can be displayed. This repository contains copies of the completed files that you will construct in this tutorial.

If you have any questions or comments about this component we would love to hear from you, so please get involved with the Rise Vision Web Designer community [here](https://community.risevision.com/rise_vision_inc/categories/rise_vision_inc_web_designers), where you can also find examples of other Components for you to try out.


This walkthrough makes use of the command line and bower to download and install the necessary files. If you are not familiar with these please check out these resources before proceeding with the walkthrough:

[Introduction to the Command Line](http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything)

[Introduction to Bower](https://css-tricks.com/whats-great-bower/)

## Step 1: Installing the Component

You should first navigate to the folder where you want to install the Component. For this example we will install it in a folder named `rise-google-calendar-demo`. You can install the component and the necessary dependencies through Bower using the following command:

```
bower install https://github.com/Rise-Vision/rise-google-calendar.git
```

After running this command you should see that a folder called `src` has been downloaded. Inside this folder is the `_bower_components` folder which contains all of the files we will need to set up our page.

## Step 2: Setting up the Google Calendar

Before we start to build our page we should set up a Google calendar so that the Component has some data to use. Please go [here](https://www.google.com/calendar) and set up a new calendar. For this demo we will use a very simple calendar with just an event date and event title, but obviously as you experiment with using the component you can include as much data in it as you want. For more information on this please check out the Component documentation [here](http://rise-vision.github.io/rise-google-calendar/components/rise-google-calendar/). 

For this demo I have set up a calendar with 3 different monthly events, but you can set up as many as you want. In order for the component to find the events you need to make the calendar and the events public. To make the calendar public please go to the settings, select the calendar you want to make public, and click on the ‘share this calendar’ link at the top of the page. You can then select the ‘Make this calendar public’ as shown here:

![publiccalendar](https://cloud.githubusercontent.com/assets/8008948/9568623/e46f7d5e-4f1c-11e5-9b29-463c4c6b16b5.png)

In order to make the event public you can choose this option when entering details of the event by selecting ‘public’ in the visibility settings here:

![publicevent](https://cloud.githubusercontent.com/assets/8008948/9568624/e61101a0-4f1c-11e5-846b-ea6b3604e206.png)

The final thing we need to do in this step is to grab the calendar ID that will tell the Component which calendar to get the data from. This can be found by going to the calendar’s settings menu at the top right of the main page, clicking on the ‘calendars’ link at the top of the page, clicking on the name of the calendar you want to use and then scrolling down until you find the Calendar Address section which gives you the calendar ID here: 

![calendarid](https://cloud.githubusercontent.com/assets/8008948/9568625/e86d31b2-4f1c-11e5-8e27-350ec35f3e5c.png)

Please make a note of this or copy it to your clipboard as you will need it in the next step.

## Step 3: Setting up the HTML

Once you have set up the calendar it is now time to set up the HTML. For this demo we will set up our `index.html` file in the root of our demo folder. You should include `webcomponents-lite.min.js` before any code that touches the DOM. Then load the web component using HTML imports.  The head section of the HTML should look like this:

```
<head>
...

 <script src="src/_bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
 <link rel="import" href="src/_bower_components/rise-google-calendar/rise-google-calendar.html">
...
</head>
You can now add the Component to the body of your HTML. The body of your HTML should look like this:
<rise-google-calendar
        id="googleCalendar"
     calendar-id="cameroncodes.com_70kgni8ejv0q9g5frkup412f44@group.calendar.google.com"
        start-date="2015-01-01" end-date="2015-12-31" refresh="5">
</rise-google-calendar>
<script>
  (function () {
    "use strict";
    function webComponentsReady() {
      window.removeEventListener("WebComponentsReady", webComponentsReady);
      var calendar = document.querySelector("rise-google-calendar");
      calendar.addEventListener("rise-google-calendar-response", function (e) {
        console.log(e.detail.items);
      });
      calendar.addEventListener("rise-google-calendar-error", function (e) {
        console.log(e.detail);
      });
      calendar.go();
    }
    window.addEventListener("WebComponentsReady", webComponentsReady);
  })();
</script>
```

As you can see, we have added the Component and set attributes for the `id`, the `calendar-id`, the `start-date` and `end-date`, and the `refresh` rate. For this demo we have set the calendar to show events for the whole of 2015.

The `refresh` rate of ‘5’ means that the Component will check the calendar every 5 minutes to see if any events have been updated. This means you don’t have to refresh your page for the new information to appear, the Component takes care of that for you!

The id attribute is just a normal HTML id attribute. We are using it here so that the JavaScript used in the next step can target the calendar. The `calendar-id` attribute refers to the unique calendar ID that we copied in step 2. You should enter this calendar ID here.

The JavaScript is used to identify the calendar element and tell the Component to grab the data. We will be modifying this in Step 5 but for now this will be enough to fetch the calendar data and return it.

## Step 4: Check that the data is being returned

Once the basic HTML is in place we should check that everything is working. In order to view the page, we will need to have it running on a local server. If you are using a Mac you can set up a local server by entering the following command:

```
python -m SimpleHTTPServer
```

This will set up a local server at localhost:8000. If you have set up your index.html file in the root of your directory you can view it by going to localhost:8000/index.html

The page should still be blank, but don’t panic! If you open up the developer tools and select ‘console’ you should see the following output:

```
[Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object ...]
```
You should see an object being returned for each event that was populated in the calendar. Awesome, it works!

If you leave the console open, you should see these objects being logged every 5 minutes, which shows the Component’s refresh attribute works too!

## Step 5: Setting up the HTML Table

As we said at the beginning of this walkthrough, now that the component is set up and returning the events from the calendar successfully, you are free to use or display this data in any way you want. For this demo we will grab this data and display it in an HTML table.

We can add the structure of the table to the HTML within the `<rise-google-calendar>` tags. We will give our table the id of `calendarTable` and add in the classes `pure-table` and `pure-table-bordered`. We will come back to how these classes are used in Step 6.

The table structure should look like this:

```
<table id="calendarTable" class="pure-table pure-table-bordered">
	<thead>
    	<tr>
        	<th>Date</th>
            <th>Summary</th>
        </tr>
    </thead>
    <tbody>
    <!-- dynamically populate table with calendar data -->
    </tbody>
</table>
```

You can see that we have added in two `<th>` elements named Date and Summary for the column headers of the table. The rest of the data will be dynamically populated within the body of the table by JavaScript.

## Step 6: Setting up the JavaScript and displaying the table

In this step we will set up the JavaScript that will take the data collected by the Component and display it in the table. 

First, please create a new file in the root of your folder - in our example we have named it demo.js. You should include a link to this file within your HTML just after the closing `</rise-google-calendar>` tag and before the code that initializes the Component, like this:

```
<script type="text/javascript" src="demo.js"></script>
```

Please see the `demo.js` file in the repository and copy and paste the code from there. All of the code is annotated so you can see the role of each function in taking the data collected by the Component and displaying it on the page.

The format used by the Component for the date attributes is the ISO 8601 format, YYYY-MM-DD. In order to show this in a different way we can use the excellent moment.js library. A version of the minified moment.js file used in this demo is included in the repository, and you can find further files and documentation on the moment.js website [here](http://momentjs.com/). For this demo we will use the format month, day, year.

You should also update the code between the `<script>` tags on in your `index.html` file. Please change it so that it looks like this:

```
<script>
  /* global demo calendar */
  (function () {
    "use strict";
    function webComponentsReady() {
      window.removeEventListener("WebComponentsReady", webComponentsReady);
      // new instance of DemoCalendar object
      var demo = new DemoCalendar();
      // initialize the content
      demo.init();
    }
    window.addEventListener("WebComponentsReady", webComponentsReady);
  })();
</script>
```

This code will tell the code in the `demo.js` file to run after the Component collected the data.

Now when you refresh the page you should see the data you entered in the spreadsheet appearing in a rough table form like this:

![roughtable](https://cloud.githubusercontent.com/assets/8008948/9568634/3db03dc2-4f1d-11e5-97d2-0b43d8e93491.png)

Congratulations, you used the Component to fetch the data and you used JavaScript to display that data in your HTML!

As an optional extra, remember those classes we added to the table tag in Step 5? Those refer to class found in the stylesheet from [purecss.io](http://purecss.io/). You can add this stylesheet to your demo by adding the following link within the head tags of the `index.html` file:

```
<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
```

Now when you refresh the page your table should look something like this:

![finaltable](https://cloud.githubusercontent.com/assets/8008948/9568635/3fc0b416-4f1d-11e5-9401-16d4b4bfae91.png)

You can now experiment with the different elements of calendar data that the Component can collect. Try adding in a start time in the calendar and then amending the `demo.js` file so that this is also added to the table.

Remember, displaying the data as an HTML table is just one option, and you can experiment with different displays by changing the HTML and JavaScript.

We can’t wait to see what you come up with. Remember, you can let us know what you think about the Components and show us what you have created in the Rise Vision Web Designer community [here](https://community.risevision.com/rise_vision_inc/categories/rise_vision_inc_web_designers). Good luck!

