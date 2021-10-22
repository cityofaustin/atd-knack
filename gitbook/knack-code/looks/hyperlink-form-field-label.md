---
description: How to hyperlink a field label on a form to make a link look like a link
---

# Hyperlink a Form Field Label

![Link to an external site for the Council District field](<../../../.gitbook/assets/image (176).png>)

![Without link color, underline, and icon](<../../../.gitbook/assets/image (169).png>)

### The CSS

We apply the blue link color to the text and have it underline on hover.

```
/*****************************************/
/** Style Links with Underline on Hover **/
/*****************************************/
/*use <a class="form-link" */
a.form-link:link {color: #367DB7; text-decoration: none;}
a.form-link:visited {color: #367DB7; text-decoration: none;}
a.form-link:hover {text-decoration: underline;}
```

### The HTML

The html lives in the field label itself and can wrap whatever text you would like to link. We used the external link icon to reinforce the idea that this is an external link.

```
<a class="form-link" href="https://www.austintexas.gov/GIS/CouncilDistrictMap/" target="_blank"> Look up Council District </a><i class="fa fa-external-link"></i>
```

### How to Implement

{% tabs %}
{% tab title="1️⃣" %}
Copy pasta the CSS. This styling will apply to all form-links

```
/*****************************************/
/** Style Links with Underline on Hover **/
/*****************************************/
/*use <a class="form-link" */
a.form-link:link {color: #367DB7; text-decoration: none;}
a.form-link:visited {color: #367DB7; text-decoration: none;}
a.form-link:hover {text-decoration: underline;}
```
{% endtab %}

{% tab title="2️⃣" %}
Open the Field Label you want to update with html

![](<../../../.gitbook/assets/image (165).png>)

Use an `<a>` tag to set the html class

```
<a class="form-link"
```
{% endtab %}

{% tab title="3️⃣" %}
Define your link

```
href="https://www.austintexas.gov/GIS/CouncilDistrictMap/"
```

Determine if you want to open the link in a new tab, if so then add `target="_blank"`

```
target="_blank"
```

and be sure to close the html tag

```
>
```
{% endtab %}

{% tab title="4️⃣" %}
In between the `<a>` `</a>` tags set your desired link text

```
> Look up Council District </a>
```
{% endtab %}

{% tab title="5️⃣" %}
Lastly, add a relevant fa icon to your link

```
<i class="fa fa-external-link"></i>
```
{% endtab %}
{% endtabs %}
