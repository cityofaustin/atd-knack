---
description: >-
  How to extract and format coordinates from a location and generate a URL to
  display a custom map within a Knack view iframe
---

# Extracting Location Coordinates to add a Map Marker Map

**Required Fields**

* Address - Project Location (with Geocoding option enabled)
* Text Formula - Project Location Display (set to Project Location address field)
* Short Text - Project Location Extract (set to Project Location text formula field if not identical)
* Text Formula - Map Marker Label Display (what fields to display for map marker label)
* Text Formula - XY Extract (combined X & Y coordinates trimmed from the Location Extract)
* Text Formula - X Extract (X coordinate trimmed from combined XY Extract)
* Text Formula - Y Extract (Y coordinate trimmed from combined XY Extract)
* Text Formula - Pure X Extract (trims the X Extract to provide a clean coordinate for the Map URL Generator formula)
* Text Formula - Pure Y Extract (trims the Y Extract to provide a clean coordinate for the Map URL Generator formula)
* Text Formula - Map Marker Modal Display (what text & fields to show on map marker popup)
* Text Formula - Map URL Generator (the arcgis web map location with specific attributes)
* Link - Map URL (set to the generated Map URL)

<figure><img src="../../.gitbook/assets/image (12) (1).png" alt=""><figcaption><p>An example of the above required fields in the TDS Portal for the TIA Mitigations Map on the TIA Request object</p></figcaption></figure>

<details>

<summary>Preparing the Location Coordinates (Longitude &#x26; Latitude)</summary>

**XY Extract**

We are taking the 23 characters at the end of the Address field that encompass both the X & Y coordinates and setting that data to the field

```
trim(right({Project Location Extract},23))
```



**X Extract**

Here we follow a similar principle as before and take the 12 characters at the end of the XY Extract field to separate out the X coordinate into its own field

```
trim(right({XY Extract},12))
```



**Y Extract**

This time we take the 14 characters at the beginning of the XY Extract field to separate out the Y coordinate into its own field

```
trim(left({XY Extract},14))
```



**Pure X Extract**

For this field we clean up the X coordinate into a usable value for the arcgis web map limiting it down from 12 characters to only 9

```
trim(right({X Extract},9))
```



**Pure Y Extract**

We do the same clean up for the Y coordinate into a usable value for the arcgis web map limiting it down from 14 characters to only 8

```
trim(right({Y Extract},8))
```



</details>

<details>

<summary>Generating the Map URL to create a Map Marker on an ArcGIS Web Map</summary>

The ArcGIS Web AppBuilder allows us to modify the app with the URL paremeters we include in the URL. To include more than one parameter, use an ampersand (&) to separate the parameters.\
[https://doc.arcgis.com/en/web-appbuilder/latest/manage-apps/app-url-parameters.htm](https://doc.arcgis.com/en/web-appbuilder/latest/manage-apps/app-url-parameters.htm)

{% code overflow="wrap" %}
```
https://austin.maps.arcgis.com/apps/webappviewer/index.html?id=d7894fc5bfad4fd1a58d45a7d24ba5b2&mobileBreakPoint=100&level=13&marker={Pure X Extract};{Pure Y Extract};;{Map Marker Modal Display};;{Map Marker Label Display}
```
{% endcode %}

1. Portal URL: _austin.maps.arcgis.com_
2. _id=_ : the unique ID of the app
3. _mobileBreakPoint=_ : we set this to 100 pixels so the default mobile layout does not apply until screen size is smaller than 100 pixels in either height or width. This ensures our map does not have a scrollbar when we set our maps from 300 to 600 pixels in width and display correctly on desktop.
4. _level=_ : we set this to one of the defined level IDs of the map service where 13 represents the default city level we want\
   [https://developers.arcgis.com/documentation/mapping-apis-and-services/reference/zoom-levels-and-scale/](https://developers.arcgis.com/documentation/mapping-apis-and-services/reference/zoom-levels-and-scale/)
5. _marker=\<x>;\<y>;\<wkid>;\<encoded title>;\<encoded icon url>;\<encoded label>_ : we set \<x> to our Pure X Extract field, \<y> to our Pure Y Extract field, leave the \<wkid> identifier blank since we are using the Global Coordinate System (GCS), we set the \<encoded title> to our Map Marker Title Display field, we leave the \<encoded icon url> blank as the default blue circle icon, and lastly set the \<encoded label> to our Map Maker Label Display field

Other Parameters to Note

1. _webmap=_ : the unique ID of the web map (we use id so we dont use this)
2. _center=_ : this would allow us to center on a standard set of coordinates (since we have different coordinates for each map marker we do not use this but is an available option)
3. _find=_ : this would allow us to automatically zoom to the closest match with a callout marker added to the map. We do not use this since we use marker & level parameters but this is another option available that is a bit simpler and more flexible allowing for use of single line addresses, partial addresses, place names, & parcel features in addition to coordinates

</details>

<details>

<summary>Preparing Knack Scene &#x26; View for Map (HTML iframe)</summary>

First we need a page setup with a Rich Text view, this is where our iframe HTML code will live. We do a pretty basic setup for our iframe but this HTML within the view can be customized for each specific map.

{% code overflow="wrap" %}
```html
<iframe src="" id="mitigationMapiFrame" style=" border:0px #ffffff none;" name="mitigationMapiFrame" scrolling="no" marginheight="0px" marginwidth="0px" allowfullscreen="" frameborder="0" width="100%" height="500px">
</iframe>
```
{% endcode %}

1. _src=_ : we leave blank since we are using a defined map id from our JavaScript code and do not need to set the source explicitly
2. _id=_ : we set this id to the name we are giving the map as represented in our JavaScript handler
3. _style=_ : here we set border thickness and color around the map
4. _name=_ : the name we are giving to this map, we set this identical to the id
5. _scrolling=_ : we set this to no to improve map usability for smaller maps
6. _marginheight=_ & _marginwidth=_ : we set these both to 0px since we dont need the extra frame space outside the map
7. _allowfullscreen=_ : we leave this blank since we are setting a defined size for the map
8. _frameborder=_ : similar to margin, we have no need for border in this example but is an available option
9. _width=_ : this we set to 100% to span the entire width of the page to take advantage of the desktop widescreen
10. _height=_ : this we set to specifically to 500px the prevent the map from being to big

Other good ratios for map displays within a page are 100x100px thumbnail maps, 300x400px small scale maps, 500x500px standard maps, or 600x900px large widescreen maps.

</details>

<details>

<summary>Rendering the Map URL in the iframe with JavaScript</summary>

This JS code can be copied and updated for your particular map. You will need a code block for each Knack view we are displaying the map in. In the handler, we need to update the scene and view IDs. We also give the map a name that we indicate in the iframe code.

```javascript
/*Feature Map Page*/
$(document).on("knack-scene-render.scene_294", function (event, page) {
  // update iframe src with Mitigation Map URL in the Detail View
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#mitigationMapiFrame").attr("src", iframe_url);
  // hide the Mitigation Map URL field & view
  $("#view_967").hide();
});
```

</details>

**Additional Link**

After completing the above setup, one more thing can help users. We can provide a Link below the rendered map so that users can navigate to the map in a new tab to view in ArcGIS Online. You would update the link with the appropriate map url.

```html
<a target="_blank" href="https://arcg.is/1ODubj0">Open Map in ArcGIS Online</a>
```
