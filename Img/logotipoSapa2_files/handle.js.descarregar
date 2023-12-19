function parseUTM()
{
    var urlSearchParams = new URLSearchParams(window.location.search);

    // if provided custom param name then use it to find click_id
    if (typeof INDOLEADS_CLICK_PARAM !== 'undefined'
        && urlSearchParams.has(INDOLEADS_CLICK_PARAM)
        && isUUID(urlSearchParams.get(INDOLEADS_CLICK_PARAM))
    ) {
        setIndoleadsClickIDCookie(urlSearchParams.get(INDOLEADS_CLICK_PARAM));
    } else if (urlSearchParams.get('utm_term') === 'indoleads'
        && isUUID(urlSearchParams.get('utm_content'))
    ) {
        setIndoleadsClickIDCookie(urlSearchParams.get('utm_content'));
    }
}

/**
 * Sets the cookie with the lifetime defined in the offer.
 *
 * @param clickID
 */
function setIndoleadsClickIDCookie(clickID)
{
    var url = 'https://app.indoleads.com/api/get-cookie-lifetime/';
    var cookie = 'indoleads_click=' + clickID;
    var cookie_lifetime_default = (6 * 30 * 24 * 60 * 60);

    if (typeof INDOLEADS_COOKIES_LIFETIME !== 'undefined'
        && INDOLEADS_COOKIES_LIFETIME !== 0
        && INDOLEADS_COOKIES_LIFETIME !== null
    ) {
        // Cookie lifetime is defined
        if (typeof INDOLEADS_COOKIES_LIFETIME_IS_HOURS !== 'undefined'
            && INDOLEADS_COOKIES_LIFETIME_IS_HOURS === true
        ) {
            // Cookie lifetime is in hours
            cookie += '; max-age=' + (INDOLEADS_COOKIES_LIFETIME * 60 * 60);
        } else {
            // Cookie lifetime is in days
            cookie += '; max-age=' + (INDOLEADS_COOKIES_LIFETIME * 24 * 60 * 60);
        }
    } else {
        // Cookie lifetime is not defined
        if (typeof INDOLEADS_OFFER_ID !== 'undefined'
            && INDOLEADS_OFFER_ID !== 0
            && INDOLEADS_OFFER_ID !== null
        ) {
            // Offer ID is defined, so we request the lifetime from our backend
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + INDOLEADS_OFFER_ID, false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    switch (xhr.status) {
                        case 200:
                            const jsonResponse = JSON.parse(xhr.responseText.trim());

                            if (parseInt(jsonResponse.cookie_lifetime) > 0) {
                                // Set cookie lifetime
                                cookie += '; max-age=' + jsonResponse.cookie_lifetime;
                            } else {
                                // Returned cookie lifetime is 0, so we set default lifetime of 180 days
                                cookie += '; max-age=' + cookie_lifetime_default;
                            }

                            break;
                        default:
                            // We've got a error response, therefore we set the default lifetime of 180 days
                            cookie += '; max-age=' + cookie_lifetime_default;
                    }
                }
            }
            xhr.send();
        } else {
            // Offer ID is not defined, so we set the default lifetime of 180 days
            cookie += '; max-age=' + cookie_lifetime_default;
        }
    }

    document.cookie = cookie;
}

// check is it UUID
function isUUID(str)
{
    var s = '' + str;
    s = s.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

    return s !== null;
}

parseUTM();
