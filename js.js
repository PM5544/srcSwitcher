// the var that gets populated by the return value of the IIFE will get executed by the parens at the end right away
// remove "var checkImages =" to lose the (global) var and the ability to re-setupImgs...
var srcSwitcher = ( function( defaultRange, undefined ) {

    var imgs
    ,   html = document.documentElement
    ,   currentRange
    ,   lastRange
    ,   getComputedStyle = ( function() {

            if ( window.getComputedStyle ) {

                // also attach the eventListener in this case since we know we are in IE9 and up or another decent browser
                window.addEventListener && window.addEventListener( "resize", check );

                return function( element, pseudo, property ) {

                    return window
                            .getComputedStyle( element, pseudo )
                            .getPropertyValue( property )
                            // why oh why do you return this value INCLUDING QUOTES Trident!
                            // just because its quoted in the CSS doenn't mean you must keep the qoutes in the string...
                            .replace( /["']/g, '' )
                            ;
                };

            } else {

                // no getComputedStyle support (which also means we can't get the value of pseudo elements )?
                // than just return a function which returns the deafult on every call
                return function() {
                    return defaultRange;
                };

            }

        } () )
    ;


    function setupImgs() {
        var currentImg
        ,   src
        ,   length = document.images.length
        ,   lastDotIndex
        ;

        // reset imgs array
        imgs = [];

        // iterate over the images to find the ones we flagged as switchable by giving them a data-src attribute
        while ( length-- ) {

            currentImg = document.images[ length ];

            src = currentImg.getAttribute( "data-src" );

            if ( src ) {

                // too bad old IE's don't support non capturing regExp in split
                // which makes src.split( /.(\w*)$/ ) useless :(
                lastDotIndex = src.lastIndexOf( "." );

                imgs.push( [
                    currentImg
                ,   [
                        src.substring( 0, lastDotIndex  )
                    ,   src.substring( lastDotIndex     )
                    ]
                ] );

            }

        }

        // reset the lastRange to force a switchImgs when check is called
        lastRange = undefined;

        // and call check to get the right dimension images for the newly added img's
        check();
    }


    // function to switch the src of the images
    function switchSrcs( range ) {
        var length = imgs.length
        ,   currentImg
        ,   src
        ;

        lastRange = range;

        while( length-- ) {

            currentImg = imgs[ length ];

            // set the src of the img to the parts of the original data-src attribute
            // and glue it with the value that was gotten from the content of the html:after to form a URL to the image file
            //
            currentImg[ 0 ].src = currentImg[ 1 ].join( range );

        }
    }

    // function to check the value of the html:after which was set by CSS
    function check() {

        currentRange = getComputedStyle( html, ":after", "content" );

        // see if it is different from the lastRange which was stored the last time switchImgs was called
        // if so call switchImgs
        lastRange !== currentRange && switchSrcs( currentRange );
    }

    // return the setupImgs function to call when inserting new images in the DOM,
    // this also is called right away to setupImgs initially...
    return setupImgs;

} ( "huge" ) ) ();