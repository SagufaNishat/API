<?php
  // put your Yelp API key here:
  $API_KEY = 'eJqsduO-qyH6hxCUnjrjnldxkv2XKwiDYFFGx8JmGqSVOSKJz0k4HGagJSoI3dy3NnbgwwgUvxdso3tGFK81Ep9tL0Jc5ixkym6EWN97IJJj9m3vzE4xzfETKRE6Y3Yx';
  $API_HOST = "https://api.yelp.com";
  $SEARCH_PATH = "/v3/businesses/search";
  $BUSINESS_PATH = "/v3/businesses/";
  $curl = curl_init();
  if (FALSE === $curl)
     throw new Exception('Failed to initialize');
  $url = $API_HOST . $SEARCH_PATH . "?" . $_SERVER['QUERY_STRING'];
  curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,  // Capture response.
            CURLOPT_ENCODING => "",  // Accept gzip/deflate/whatever.
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "authorization: Bearer " . $GLOBALS['API_KEY'],
                "cache-control: no-cache",
            ),
        ));
  $response = curl_exec($curl);
  curl_close($curl);
  print $response;
?>
