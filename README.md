srcSwitcher
===========

A small piece of JavaScript which switches the src attribute of targeted img elements on the current page based on ranges defined in CSS media queries.
Save precious HTTP request and only download the image you need at a specific device dimension.

[Demo](http://pm5544.eu/srcSwitcher/ "see the demo page")

In the current landscape of devices, that are able to view webpages, there's a lot of different screen sizes.
This means that you want to send the right size to the right device, especially when you think of smart-phones which use 3G or other sub-optimal connections.

There are some libs out there which serve dynamically created images from the server, but those solutions do not work in situation where there's no control over server processing or there just is none (eg in front-end only application).
And most of those libs have an initial request to the server for an image, due to the fact of the HTML parser starts loading the images before JavaScript can calculate the screen dimensions, after which it may have to download another image which better suits the current screen dimensions.

srcSwitcher uses the HTML5 data attribute to store a URL of an image file which is later converted in the src attribute of that img element.
This has a couple of advantages:
* you only have to put "data-" in front of the src attribute to have that image switch sources
* you keep the src or the img element in that element, instead of in JavaScript, making it easier to maintain different image sizes

The downside to this approach is that no images are shown when JavaScript is turned off, so YMMV.
To counter this you could put img elements inside a noscript.

In CSS you specify ranges with media queries to let the page react to the differences in screen sizes.
So the decision, as to which range is relevant at a certain size, is done in CSS where all that logic already exists, and is more easily maintained, so you don't have to repeat CSS breakpoints in JavaScript.
This script just reacts to the information that is providede by CSS, also eliminating the possibility that JavaScript and CSS give conflicting information about the current screen size and therefor all parts of the same page will react on the same time.

The way it listens to changes in CSS is based on [@adactio's "Conditional CSS" post](http://adactio.com/journal/5429/ "check out his post") in which he explains the why and how.

# Using this
* Make (or generate) different size images and put them in the same folder reachable to the page and give them a suffix indicating the size, like myImage_small.jpg or myImage_huge.jpg
* In your markup change the "src"= attribute of the images you want to srsSwitch to the "data-src"= attribute and delete the part which indicates the size, like myImage_.jpg
* In CSS define ranges (like i did in the css.css file) or add the html:before{ content: "somerange" } to you current media queries and make sure they match the size indication you used when making the images
* Put the script at the bottom of the page (at least after the last img element)

When you add images to the page after the script is run you can call the function srcSwitch to reinitialize and also take the new images into account.

This script uses a default range when media queries or window.getComputedStyle() are not supported (roughly the same set of browsers).
This means that IE8 and earlier just download the images for the default range and do not switch when the browser is resized.

If you have any comments or questions drop me a line on Twitter (@pm5544).