---
description: How to setup SSO in Knack for Azure ADFS
---

# Single Sign On \(SSO\)

## Enabling SSO in Knack

{% tabs %}
{% tab title="1️⃣" %}
Open the Knack builder and navigate to a login page where you would like to enable SSO

![](../../.gitbook/assets/image%20%28300%29.png)

![](../../.gitbook/assets/image%20%28294%29.png)
{% endtab %}

{% tab title="2️⃣" %}
Select the pencil icon to open the edit menu on the login form and navigate to Settings

![](../../.gitbook/assets/image%20%28297%29.png)
{% endtab %}

{% tab title="3️⃣" %}
You will see the COACD provider listed for apps already setup with SSO, otherwise you would select the Add Provider button to add it for new apps

![](../../.gitbook/assets/image%20%28293%29.png)
{% endtab %}

{% tab title="4️⃣" %}
Select the checkbox to enable SSO for this login page and Save Changes

![](../../.gitbook/assets/image%20%28288%29.png)

You will need to repeat these steps for each login page that SSO is to be enabled
{% endtab %}
{% endtabs %}

## Configuring an existing Knack App with certificates

{% tabs %}
{% tab title="1️⃣" %}
Navigate to an SSO enabled login page in the Knack builder, typically the Home Login page is a good candidate, and navigate to the Settings.

![](../../.gitbook/assets/image%20%28289%29.png)

![](../../.gitbook/assets/image%20%28290%29.png)
{% endtab %}

{% tab title="2️⃣" %}
Select the pencil icon for the Single Sign On to open the modal page with the settings

![](../../.gitbook/assets/image%20%28286%29.png)
{% endtab %}

{% tab title="3️⃣" %}
In this scenario, since we already have the app setup in Azure with CTM, the Identity Provider's certificate will stay as is and we make no changes to the Private signing certificate. We are simply taking the Decryption private and public certificates saved in 1Password as _Self-Signed x509 SSL Certificates for SAML/ADFS_ and adding them here. Be sure to clear the boxes before adding the formatted certificates.

![](../../.gitbook/assets/image%20%28285%29.png)

And be sure to Save.
{% endtab %}

{% tab title="4️⃣" %}
If for some reason the Identity Provider's certificate is missing or needs to be re-added, these are saved in 1Password as Knack _ADFS X.509 IP Certificates_ for each app.

![](../../.gitbook/assets/image%20%28298%29.png)

Copy the IP Cert for the app you need and paste into the Identity Provider's certificate box. These certificates should be saved formatted with headers already.

Be sure to Save changes
{% endtab %}
{% endtabs %}

## Configuring a new Knack App with certificates

{% tabs %}
{% tab title="1️⃣" %}
Create a login enabled Knack page if one has not yet been made. 

![](../../.gitbook/assets/image%20%28281%29.png)

Then, navigate to the login page Settings in the Knack builder by selecting the pencil icon on the login form.

![](../../.gitbook/assets/image%20%28299%29.png)
{% endtab %}

{% tab title="2️⃣" %}
Select the Add Provider button

![](../../.gitbook/assets/image%20%28303%29.png)

An Add Credentials modal will appear, you will select SAML 1.1 or 2.0 for the Provider Type

![](../../.gitbook/assets/image%20%28291%29.png)

![](../../.gitbook/assets/image%20%28302%29.png)
{% endtab %}

{% tab title="3️⃣" %}
Enter COACD as the Provider Name.

We use custom buttons for our logins but if your app is not, the button and font colors below are the standard colors.

![](../../.gitbook/assets/image%20%28284%29.png)
{% endtab %}

{% tab title="4️⃣" %}
Next, enter Provider Settings. Provider Entry Point should remain the same for all apps unless something changes with Azure Active Directory. The Provider Entry Point can be confirmed with CTM or found in the metadata file near the `<SingleSignOnService>` tag from its `Location` attribute. `https://login.microsoftonline.com/5c5e19f6-a6ab-4b45-b1d0-be4608a9a67f/saml2`. 

For Issuer, this uniquely identifies your app and cannot change once set since CTM uses this to name the app instance in Azure. The app instance must be recreated in Azure if this is to change in the future. Issuer is prepended with `atd.knack.com/` following by your `app-name`

![](../../.gitbook/assets/image%20%28292%29.png)
{% endtab %}

{% tab title="5️⃣" %}
Leave the Identity Provider's certificate and Private signing certificate boxes empty

![](../../.gitbook/assets/image%20%28280%29.png)
{% endtab %}

{% tab title="6️⃣" %}
Locate our self-signed SSL certificates in 1Password as _Self-Signed x509 SSL Certificates for SAML/ADFS._ Our Self-Signed certs are listed under the valid date range and show Valid From and Valid To dates. Select Copy for the Decryption Private Key and paste in the Decryption private certificate box. Do the same for the Decryption Public Key and paste in the Decryption public certificate box. These certificates have already been formatted with headers with the [Private Key formatter](https://www.samltool.com/format_privatekey.php) and the [X509 Formatter](https://www.samltool.com/format_x509cert.php).

![](../../.gitbook/assets/image%20%28296%29.png)

![](../../.gitbook/assets/image%20%28295%29.png)
{% endtab %}

{% tab title="7️⃣" %}
Logout URL can be left blank until needed and if applicable to your app.

Authentication Context will be the same for all apps, `urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport`

ID Property and Email Property will be identical and the same for all apps since users use their email as their identity to sign into our Knack apps. `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`

First Name Property and Last Name Property will be left blank since they are not necessary.

![](../../.gitbook/assets/image%20%28283%29.png)

Select Save to save all changes.
{% endtab %}

{% tab title="8️⃣" %}
Now that we created and saved our Provider, we download the metadata file for the SSO by selecting the download button. 

![](../../.gitbook/assets/image%20%28304%29.png)

We can save this as an XML file to send to CTM or we can send them a copy of the link in your browser of the downloaded XML file. Log into the City's [ServiceNow Portal ](https://atx.service-now.com/sp) and create a request indicating that you want to setup Azure Active Directory on a Knack application. Attach and/or link XML metadata file to the request.
{% endtab %}

{% tab title="9️⃣" %}
CTM  will eventually respond to your service request and provide you with their own metadata file for the app.  Navigate back to the custom SSO provider setup form in the Knack builder.

In CTM's metadata file, find the Identity Provider certificate in the metadata under the `Signature tag`, then the `KeyInfo` tag, then the `X509Certificate` tag. 

![](../../.gitbook/assets/image%20%28287%29.png)

Copy and paste the contents of the `X509Certificate` tag into the [X509 Formatter](https://www.samltool.com/format_x509cert.php). Click the "Format X.509 Certificate" button, then copy the contents of output box labeled "X.509 cert with header". Paste the formatted certificate into the **Identity Provider's certificate** field in the Knack login config.

![](../../.gitbook/assets/image%20%28301%29.png)

Be sure to Save changes.
{% endtab %}

{% tab title="🔟" %}
Lastly, you must enable the SSO on each login page by selecting the checkbox

![](../../.gitbook/assets/image%20%28282%29.png)
{% endtab %}
{% endtabs %}

## Configuring new certificates for all Knack Apps

{% hint style="warning" %}
If you need to generate a new certificate \(because the current cert has expired, for example\), see our [SSL Certificate Management](ssl-certificate-management.md) article for instructions. Note that as a best practice we use the same certificate across all knack apps. So, if you do need to generate a new certificate, you should do this for every Knack application. Consult the application team before embarking on this.
{% endhint %}

1. Generate new certificates according to our [SSL Certificate Management](ssl-certificate-management.md)
2. Make sure to save those new certificates in One Password with proper formatting
3. Schedule a meeting with CTM so they can update Azure Active Directory as you update app certificates \(this limits or negates any downtime users will have signing into apps\)
4. During the meeting, navigate to a Knack login page with SSO enabled in the builder
5. Replace the Decryption private certificate and the Decryption public certificates with the new certificates that we just created
6. Save and test an SSO login page. If you get a Public Key error, CTM will need to recreate the app instance in Azure. Otherwise, update and test each app accordingly until complete

#### If Testing does result in a Public Key error, continue:

1. As CTM is recreating the new app instance in Azure, remove the Identity Provider's certificate in Knack and then provide CTM the updated metadata file or link with only the Decryption private and public certificates filled in. All other Provider Settings should remain and stay the same
2. CTM will add the metadata info to Azure, allowing them to provide you a new metadata file or link with the x509 certificate in it
3. Verify with CTM that the x509 certificate in the file you received matches the Identity Provider certificate in Azure \(by matching the last few characters of the cert\)
4. Copy that x509 certificate from the metadata file or link
5. Use the [X509 Formatter](https://www.samltool.com/format_x509cert.php) to format the x509 certificate with headers
6. Add to the Knack Identity Provider's certificate box and save the updated credentials
7. Test an SSO login page to ensure its working correctly
8. Add the new unique IP Cert to One Password as your repeat these steps for each Knack app

## **Possible Errors**

{% hint style="warning" %}
If you get the Public Key error in your browser, a new app instance must be created in Azure by CTM where the existing IP Cert must be removed and replaced with the new certificate CTM provides. Refer to the _Configuring new certificates for all Knack apps_ above for the steps to take.
{% endhint %}

{% hint style="warning" %}
If you see an error similar to this: \(_AADSTS50011: The reply URL specified in the request does not match the reply URLs configured for the application: 'atd.knack.com/_'\), contact CTM and ask them to update the Azure Instance \(ACS URL\) with `US` included in the URL.
{% endhint %}

