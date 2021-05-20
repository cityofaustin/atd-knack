---
description: How to adjust Global HighCharts report styling
---

# HighCharts Report Styling

Overall, the base report styling in Knack is pretty bland. Knack uses a [HighCharts](https://www.highcharts.com/) integration, an interactive JavaScript reporting tool to supply its Report views.

![A light blue report background and a more defined plot transparency and border](../../.gitbook/assets/image%20%2861%29.png)

### The JS

The code allows us to modify the global setOptions styling specified in the [HighCharts documentation](https://www.highcharts.com/docs/getting-started/how-to-set-options). We can customize the report container and the plot by adjusting color, shadow, and borders. This allows our reports to look more well-defined and bring attention to the data being displayed.

```text
/***************************************/
/**** Global Reporting Page Styling ****/
/***************************************/
Highcharts.setOptions({
    chart: {  
      backgroundColor: {
            linearGradient: [500, 500, 500, 500], /*for report container, set to same value for no gradient*/
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)'] /*we create a light blue report container background to contrast the data with the white plot area and white page*/
            ]
        },
        borderWidth: 0, /*border width for report container, does not include title, print/download, or filter menu*/
        plotBackgroundColor: 'rgba(255, 255, 255, .9)', /*how much lighter you want the plot background to be compared to report background color. 
        We make the plot background almost transparent to be similar as the page color and contrast with the light blue report container color*/
        plotShadow: false, /*adds shadow to bottom and right of plot and gives a 3D effect. We make it flat.*/
        plotBorderWidth: 2 /*for plot only. Helps user focus on data in the plot*/
    }
});
```

### The CSS

See [Report Element Colors](https://atd-dts.gitbook.io/atd-knack-operations/knack-code/looks/report-element-colors) to style individual reports and elements

### How to Implement

Remember these global options apply to all reports. We use them to apply a consistent look and feel that is more readable to our users or alternatively, more thematic to the application colors or content.





