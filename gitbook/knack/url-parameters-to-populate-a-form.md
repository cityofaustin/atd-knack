# URL Parameters to populate a form

Knack [documentation ](https://learn.knack.com/article/z36i2it02b-how-to-use-url-variables-to-pre-populate-a-form)of process

DTS Documentation in Issue [\#5735](https://app.zenhub.com/workspaces/data--technology-services-5caf7dc6ecad11531cc418ef/issues/cityofaustin/atd-data-tech/5735)

`{"field_390":"Finance & Administration","field_398":"Bug Report — Something is not working","field_399":"Finance & Purchasing"}`

Example of form Link with URL parameters:

[https://atd.knack.com/dts\#new-service-request/?view\_249\_vars=%7B%22field\_390%22%3A%22Finance%20%26%20Administration%22%2C%22field\_398%22%3A%22Bug%20Report%20%E2%80%94%20Something%20is%20not%20working%22%2C%22field\_399%22%3A%22Finance%20%26%20Purchasing%22%7D](https://atd.knack.com/dts#new-service-request/?view_249_vars=%7B%22field_390%22%3A%22Finance%20%26%20Administration%22%2C%22field_398%22%3A%22Bug%20Report%20%E2%80%94%20Something%20is%20not%20working%22%2C%22field_399%22%3A%22Finance%20%26%20Purchasing%22%7D)

Here's what is super frustrating, the encoder link the documentation included was changing spaces to `+` instead of `%20`.

[https://www.urlencoder.org/](https://www.urlencoder.org/) &lt;-- this link will change the spaces to `%20`

Didn't include square brackets since the fields didnt appear to be connected fields, but i am not sure it made a difference with or without brackets



