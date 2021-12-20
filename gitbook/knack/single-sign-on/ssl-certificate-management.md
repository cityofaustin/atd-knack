---
description: How to create new certificates for our Knack apps
---

# SSL Certificate Management

This will guide you through creating a new self-signed certificate which can be installed in Knack applications (or elsewhere) for SSL authentication.

Note that as a best practice we use the same certificate across all knack apps. So, if you do need to generate a new certificate, you should do this for every Knack application. _Consult the application team before embarking on this._

1. Before you begin, make sure you have looked at our existing certificates in 1Password **Self-Signed x509 SSL Certificates for SAML/ADFS**. The Valid From and Valid To (expiration date) are noted there as well. If you need to generate a new certificate (because the current certs have expired, for example), continue.
2. Visit the [SAML Developer Tools website](https://www.samltool.com/self\_signed\_certs.php)
3. Complete the certificate form fields as follows:

* `Common Name`: austintexas.gov
* `Organization`: City of Austin
* `Organization Unit Name`: Austin Transportation
* `State`: Texas
* `Country`: us
* `Valid Days:`365 or 720
* `Email Address`: transportation.data@austintexas.gov
* `Bits to generate the private key`: 1024 bits
* `Digest Algorithm:`SHA512

4\. Click the **Generate Self-Signed Certs**&#x20;

5\. Store the Private Key and Public X.509 Key in 1Password, formatted with headers, following the conventions for the existing 1Password entry.

6\. Coordinate with CTM to update our certs. Set a calendar reminder to update the certificates again before they expire!
