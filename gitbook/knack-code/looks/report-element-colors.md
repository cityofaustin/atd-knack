---
description: How to apply matching colors between different chart types
---

# Report Element Colors

![Without matching colors](../../.gitbook/assets/image%20%28139%29.png)

![With matching bar colors](../../.gitbook/assets/image%20%28141%29.png)

Unfortunately Knack does not apply the default HighCharts colors for bar charts and only gives the bar elements the first blue color. To increase clarity when comparing charts, we manipulate each individual bar so that is matches its corresponding pie chart color. Below is the list of the [Default HighChart Colors](https://api.highcharts.com/highcharts/colors).

1. \#7cb5ec
2. \#434348
3. \#90ed7d
4. \#f7a35c
5. \#8085e9
6. \#f15c80
7. \#e4d354
8. \#2b908f
9. \#f45b5b
10. \#91e8e1

### The JS

None needed 😎 though we do use the [Global HighCharts Report Styling](https://atd-dts.gitbook.io/atd-knack-operations/knack-code/looks/global-report-styling)

### The CSS

There are several different situations, based on the number of calculated elements in a chart, that determine what kind of selector we use to change the colors.

{% tabs %}
{% tab title="10+ Element Bar Chart" %}
If you have 10 or more elements \(values\) being calculated, you can use a simplified notation the negates the need for more than 10 lines of code

```text
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n){fill: #91e8e1;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+1){fill: #7cb5ec;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+2){fill: #434348;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+3){fill: #90ed7d;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+4){fill: #f7a35c;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+5){fill: #8085e9;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+6){fill: #f15c80;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+7){fill: #e4d354;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+8){fill: #2b908f;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10n+9){fill: #f45b5b;}
```
{% endtab %}

{% tab title="Incremental Bar Chart" %}
We use incremental notation if we have 10 or fewer elements

```text
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(1){fill: #7cb5ec;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(2){fill: #434348;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(3){fill: #90ed7d;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(4){fill: #f7a35c;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(5){fill: #8085e9;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(6){fill: #f15c80;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(7){fill: #e4d354;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(8){fill: #2b908f;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(9){fill: #f45b5b;}
#kn-report-view_1369-1 div.highcharts-container svg g.highcharts-series-group g.highcharts-series rect:nth-child(10){fill: #91e8e1;}
```
{% endtab %}

{% tab title="Pie Chart" %}
Or if you would like to modify the colors to a pie chart, you need to change the color for both the pie slice and the `rect` legend element. In this example we specify unique colors that match the RPP zone colors.

```text
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(1) {fill: DodgerBlue;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(1).highcharts-legend-item rect{fill: DodgerBlue;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(2) {fill: #b29700;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(2).highcharts-legend-item rect{fill: #b29700;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(3) {fill: Green;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(3).highcharts-legend-item rect{fill: Green;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(4) {fill: Orange;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(4).highcharts-legend-item rect{fill: Orange;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(5) {fill: LightPink;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(5).highcharts-legend-item rect{fill: LightPink;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(6) {fill: Purple;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(6).highcharts-legend-item rect{fill: Purple;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(7) {fill: Red;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(7).highcharts-legend-item rect{fill: Red;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-series-group g.highcharts-series path:nth-child(8) {fill: Turquoise;}
#kn-report-view_1317-2 div.highcharts-container svg g.highcharts-legend g:nth-child(8).highcharts-legend-item rect{fill: Turquoise;}
```
{% endtab %}
{% endtabs %}

### How to Implement

You can simply copy the CSS above that is applicable depending on how many elements you have, what chart you are manipulating, and what colors are being used.

The report View ID will need to be updated for each line. Additionally, the number after the View ID indicates which report in the report view you are manipulating. For example if you had 2 reports in a view, the first would be 1, the second would be 2. With the New Knack Builder, it is not recommended to have more than 2 reports per report view so that report views can easily be managed and copied.

```text
/*Report 1 in the View*/
#kn-report-view_1317-1

/*Report 2 in the View*/
#kn-report-view_1317-2
```





