# SSL Certificate Management

This will guide you through creating a new self-signed X.509 certificate which can be installed in Knack applications \(or elsewhere\) for SSL authentication.

Note that as a best practice we use the same certificate across all knack apps. So, if you do need to generate a new certificate, you should do this for every Knack application. _Consult the application team before embarking on this._

You may also be interested in our [wiki page](https://atd-dts.gitbook.io/austin-transportation-knack-guides/knack/single-sign-on) about configuring ADFS logins in Knack.

1. Before you begin, make sure you have looked at our existing SSL certificate in 1Password. It's saved as **Self-Signed x509 SSL Certificates for SAML/ADFS**. The expiration date is noted there as well.

   If you need to generate a new certificate \(because the current cert has expired, for example\), continue.

2. Visit the [SAML Developer Tools website](https://www.samltool.com/self_signed_certs.php)
3. Complete the certificate form fields as follows:

* `Common Name`: austintexas.gov
* `Organization`: City of Austin
* `Organization Unit Name`: Austin Transportation
* `State`: Texas
* `Country`: us
* `Valid Days:`365
* `Email Address`: transportation.data@austintexas.gov
* `Bits to generate the private key`: 1024 bits
* `Digest Algorithm:`SHA512

4. Click the **Generate Self-Signed Certs** 

5. Store the Private Key and X.509 cert in 1Password, following the conventions in the existing 1Password entry.

6. Coordinate with CTM to update our certs. Set a calendar reminder to update the certificates again before they expire!

